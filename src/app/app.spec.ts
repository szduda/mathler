import { test, expect } from "@playwright/test";

test("should navigate to the help page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click("text=Help");
  await expect(page).toHaveURL("http://localhost:3000/help");
  await expect(page.locator("h1")).toContainText("Need Help?");
});

test("should display keyboard and submit button", async ({ page }) => {
  await page.addInitScript("{Date = { Date.now = () => 0;}");
  await page.goto("http://localhost:3000/");

  await expect(page.locator("h1")).toContainText("Mathler");
  await expect(
    page.getByRole("button", { name: "Submit Soluion" })
  ).toBeDefined();
  [
    ...[...Array(10)].map((_, index) => String(index)),
    "+",
    "-",
    "*",
    "/",
    "Backspace",
  ].forEach(async (key) => {
    await expect(page.getByRole("button", { name: key })).toBeDefined();
  });
});

test("should inform user if they won", async ({ page }) => {
  await page.addInitScript("{Date = { Date.now = () => 0;}");
  await page.goto("http://localhost:3000/");

  // await expect(page.getByTestId("riddle")).toContainText("123");
  await page.locator("body").pressSequentially("111+99", { delay: 100 });
  await page.locator("body").press("Backspace", { delay: 200 });
  await page.locator("body").press("Backspace", { delay: 100 });

  await page.locator("body").pressSequentially("12", { delay: 100 });
  await expect(page.getByText("111+12")).toBeVisible();
  await page.locator("body").press("Enter", { delay: 1000 });
  await expect(page.getByText("Bravo!")).toBeVisible();
  await expect(page.getByText("Next riddle in")).toBeVisible();
  const backButton = page.getByRole("button", { name: "Travel Back In Time" });
  await expect(backButton).toBeVisible();
  await backButton.click();
  await expect(backButton).toBeHidden();
  await page.locator("body").press("Enter");
  await expect(page.getByText("Row must be complete")).toBeVisible();
  await page.locator("body").pressSequentially("60*2+3", { delay: 100 });
  await page.locator("body").press("Enter");
  await expect(page.getByText("You're doing great")).toBeVisible();
  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Submit Solution" }).click();
  await expect(page.getByText("You solved this riddle!")).toBeDefined();
});

test("should inform user if they lost", async ({ page }) => {
  await page.addInitScript("{Date = { Date.now = () => 0;}");
  await page.goto("http://localhost:3000/");

  // [...Array(6)].forEach(async () => {
  await page.locator("body").pressSequentially("199-76", { delay: 100 });
  await page.locator("body").press("Enter");
  await page.locator("body").pressSequentially("199-76", { delay: 100 });
  await page.locator("body").press("Enter");
  await page.locator("body").pressSequentially("199-76", { delay: 100 });
  await page.locator("body").press("Enter");
  await page.locator("body").pressSequentially("199-76", { delay: 100 });
  await page.locator("body").press("Enter");
  await page.locator("body").pressSequentially("199-76", { delay: 100 });
  await page.locator("body").press("Enter");
  await page.locator("body").pressSequentially("199-76", { delay: 100 });
  await page.locator("body").press("Enter");
  // });

  await expect(page.getByText("Good luck next time.")).toBeVisible();
});
