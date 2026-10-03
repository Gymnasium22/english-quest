import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { auditContent, buildSnapshot, issueKey, splitIssues, type AuditIssue } from "@/lib/content-audit";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const snapshotIndex = args.indexOf("--snapshot");
const writeBaseline = args.includes("--write-baseline");

const report = auditContent();
const { known, unknown } = splitIssues(report.issues);
const unknownErrors = unknown.filter((issue) => issue.level === "error");
const unknownWarnings = unknown.filter((issue) => issue.level === "warning");

function printSection(title: string, issues: AuditIssue[]): void {
  if (!issues.length) return;
  console.log(`\n${title}:`);
  for (const issue of issues) {
    const place = [issue.unit, issue.module, issue.activity].filter(Boolean).join(" / ");
    console.log(`  ${place} — ${issue.where}: ${issue.message}`);
  }
}

console.log("Контент по юнитам:");
for (const unit of report.stats) {
  console.log(`  ${unit.unit} (${unit.title}): ${unit.totalQuestions} вопросов`);
  for (const mod of unit.modules) {
    const parts = mod.activities.map((activity) => `${activity.id}:${activity.questions}`);
    console.log(`    ${mod.id} — ${mod.total} (${parts.join(", ")})`);
  }
}

if (snapshotIndex >= 0) {
  const target = args[snapshotIndex + 1];
  if (!target) {
    console.error("\nДля --snapshot укажите путь к файлу.");
    process.exit(2);
  }
  const absolute = resolve(process.cwd(), target);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, `${JSON.stringify(buildSnapshot(), null, 2)}\n`, "utf8");
  console.log(`\nСлепок записан: ${target}`);
}

if (writeBaseline) {
  const target = resolve(process.cwd(), "src/lib/known-content-issues.json");
  const keys = [...new Set(report.issues.map(issueKey))].sort();
  const payload = {
    note: "Известные проблемы контента. Валидатор не считает их новыми и не роняет проверку. Ключ = unit|module|activity|where|code. Пересобрать: npm run validate -- --write-baseline",
    keys,
  };
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`\nБазовый список обновлён: ${keys.length} записей.`);

  console.log("\nИзвестные проблемы:");
  for (const issue of report.issues) {
    const place = [issue.unit, issue.module, issue.activity].filter(Boolean).join(" / ");
    console.log(`  [${issue.level}] ${place} — ${issue.where} — ${issue.code}: ${issue.message}`);
  }
  process.exit(0);
}

printSection("Новые ошибки", unknownErrors);
printSection("Новые предупреждения", unknownWarnings);

console.log(`\nИтого: новых ошибок ${unknownErrors.length}, новых предупреждений ${unknownWarnings.length}, известных проблем ${known.length}.`);
if (unknownErrors.length || (strict && unknownWarnings.length)) {
  process.exit(1);
}
