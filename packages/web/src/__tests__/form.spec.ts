import { test } from "@playwright/test";

test("FormTest", async ({ page }) => {
  //login
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("zuurc@hotmail.com");
  await page.getByLabel("Email Address *").press("Tab");
  await page.getByLabel("Password *").fill("123456");
  await page.getByLabel("Remember me").check();
  await page.getByRole("button", { name: "Sign In", exact: true }).click();

  //create form
  await page.locator(".css-art2ul-ValueContainer2").first().click();
  await page.getByText("Angola", { exact: true }).click();
  await page
    .locator(
      "div:nth-child(2) > .MuiFormControl-root > .css-b62m3t-container > .css-pm918g-control > .css-art2ul-ValueContainer2"
    )
    .click();
  await page.getByText("Bengo Province", { exact: true }).click();
  await page
    .locator(
      "div:nth-child(3) > .MuiFormControl-root > .css-b62m3t-container > .css-pm918g-control > .css-art2ul-ValueContainer2 > .css-1py426d-Input2"
    )
    .click();
  await page.getByText("Caxito", { exact: true }).click();
  await page.getByLabel("Name *").click();
  await page.getByLabel("Name *").fill("Rodrigo Carlos");
  await page.getByLabel("Email Address *").click();
  await page.getByLabel("Email Address *").fill("rodrigocarlos@gmail.com");
  await page.getByLabel("CPF *").click();
  await page.getByLabel("CPF *").fill("575.982.428-79_");
  await page.getByLabel("BirthDate *").fill("1978-04-12");
  await page.getByLabel("Description *").click();
  await page.getByLabel("Description *").fill("Jovem rapaz");
  await page.getByRole("button", { name: "Insert" }).click();

  //updateForm
  await page
    .getByRole("listitem")
    .filter({ hasText: "Rodrigo Carlosrodrigocarlos@gmail.com" })
    .getByRole("button", { name: "edit" })
    .click();
  await page.getByLabel("Description *").click();
  await page.getByLabel("Description *").fill("Jovem rapaz 2.0");
  await page.getByRole("button", { name: "Update" }).click();

  //deleteForm
  await page
    .getByRole("listitem")
    .filter({ hasText: "Rodrigo Carlosrodrigocarlos@gmail.com" })
    .getByRole("button", { name: "delete" })
    .click();
  await page.getByRole("button", { name: "Confirm" }).click();

  //logout
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByText("Logout").click();
});
