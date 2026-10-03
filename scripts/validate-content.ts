import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { auditContent, buildSnapshot, type AuditIssue } from "@/lib/content-audit";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const snapshotIndex = args.indexOf("--snapshot");

const report = auditContent();
const errors = report.issues.filter((issue) => issue.level === "error");
const warnings = report.issues.filter((issue) => issue.level === "warning");

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

printSection("Ошибки", errors);
printSection("Предупреждения", warnings);

console.log(`\nИтого: ошибок ${errors.length}, предупреждений ${warnings.length}.`);
if (errors.length || (strict && warnings.length)) {
  process.exit(1);
}
