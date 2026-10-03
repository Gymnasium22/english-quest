import { describe, expect, it } from "vitest";
import { auditContent, buildSnapshot } from "@/lib/content-audit";
import fixture from "./__fixtures__/generated.json";

describe("контент", () => {
  it("сборка вопросов совпадает с эталоном", () => {
    expect(buildSnapshot()).toEqual(fixture);
  });

  it("у каждого юнита пять модулей с заданиями", () => {
    for (const unit of auditContent().stats) {
      expect(unit.modules).toHaveLength(5);
      expect(unit.totalQuestions).toBeGreaterThan(0);
      for (const mod of unit.modules) {
        expect(mod.activities.length).toBeGreaterThan(0);
        for (const activity of mod.activities) {
          expect(activity.questions).toBeGreaterThan(0);
        }
      }
    }
  });
});
