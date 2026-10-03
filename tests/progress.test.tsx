import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { Player } from "@/components/Player";
import { ProgressProvider, useProgress } from "@/lib/progress";
import type { Question } from "@/lib/questions";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>,
}));

type Api = ReturnType<typeof useProgress>;
let api: Api | null = null;

function Probe() {
  api = useProgress();
  return null;
}

const choice: Question = {
  kind: "choice",
  id: "test-choice",
  itemId: "adult",
  prompt: "adult",
  options: ["взрослый", "ребёнок", "юноша", "старик"],
  answer: "взрослый",
  reveal: "adult — взрослый",
};

function setup(questions: Question[] = [choice], activityKey?: string) {
  render(
    <ProgressProvider>
      <Probe />
      <Player title="Тест" questions={questions} activityKey={activityKey} onDoneHref="/" />
    </ProgressProvider>,
  );
}

async function ready() {
  await waitFor(() => expect(api?.ready).toBe(true));
}

function xp(): number {
  return api?.state.xp ?? -1;
}

beforeEach(() => {
  localStorage.clear();
  api = null;
});

afterEach(() => {
  cleanup();
});

describe("начисление XP", () => {
  it("даёт 10 XP за верный ответ и не начисляет их повторно", async () => {
    setup();
    await ready();

    fireEvent.click(screen.getByText("взрослый"));
    await waitFor(() => expect(xp()).toBe(10));

    fireEvent.click(screen.getByText("взрослый"));
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(xp()).toBe(10);
    expect(api?.state.items.adult?.correct).toBe(1);
  });

  it("даёт +25 XP за завершение задания, отмечает его и открывает достижение", async () => {
    setup([choice], "vocabulary/test-choice");
    await ready();

    fireEvent.click(screen.getByText("взрослый"));
    await waitFor(() => expect(xp()).toBe(10));

    fireEvent.click(screen.getByRole("button", { name: "Дальше" }));
    await waitFor(() => expect(xp()).toBe(35));

    expect(api?.state.completed).toContain("vocabulary/test-choice");
    expect(api?.state.achievements).toContain("first-step");
    expect(screen.getByText("ГОТОВО")).toBeTruthy();
  });

  it("после двух ошибок не даёт XP и помечает слово для повторения", async () => {
    setup();
    await ready();

    fireEvent.click(screen.getByText("ребёнок"));
    await screen.findByRole("button", { name: "Ещё попытка" });
    expect(xp()).toBe(0);
    expect(api?.state.items.adult?.wrong).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Ещё попытка" }));
    fireEvent.click(screen.getByText("юноша"));
    await screen.findByText("Попытки закончились");

    expect(xp()).toBe(0);
    // Ошибка записывается один раз на вопрос, вторая попытка её не удваивает.
    expect(api?.state.items.adult?.wrong).toBe(1);
    expect(api?.practiceIds).toContain("adult");
  });

  it("сохраняет прогресс в прежние ключи localStorage", async () => {
    setup([choice], "vocabulary/test-choice");
    await ready();

    fireEvent.click(screen.getByText("взрослый"));
    await waitFor(() => expect(xp()).toBe(10));

    await waitFor(() => expect(localStorage.getItem("english-quest-unit1")).toBeTruthy());
    const saved = JSON.parse(localStorage.getItem("english-quest-unit1") ?? "{}") as { xp?: number };
    expect(saved.xp).toBe(10);
    expect(localStorage.getItem("english-quest-current-unit")).toBe("unit1");
  });
});
