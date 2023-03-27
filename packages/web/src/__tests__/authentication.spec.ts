import { test } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("zuurc@hotmail.com");
  await page.getByLabel("Email Address *").press("Tab");
  await page.getByLabel("Password *").fill("123456");
  await page.getByLabel("Remember me").check();
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
});

test("logout", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("zuurc@hotmail.com");
  await page.getByLabel("Email Address *").press("Tab");
  await page.getByLabel("Password *").fill("123456");
  await page.getByLabel("Remember me").check();
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByText("Logout").click();
});
