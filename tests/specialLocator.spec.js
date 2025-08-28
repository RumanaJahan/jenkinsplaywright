import {test, expect} from '@playwright/test';

test('special locator test', async ({page})=>
{
   await page.goto('https://rahulshettyacademy.com/angularpractice/');

   const name = page.locator("input[name='name']");
    await name.nth(0).fill("Test User");
   
   const email = page.locator("input[name='email']");
   await email.fill("testrum@gmail.com");

   const password = page.getByPlaceholder("Password");
   await password.fill("test123");

   const checkox = page.getByLabel("Check me out if you Love IceCreams!");
   await checkox.check();

   const radiobutton = page.getByLabel("Employed");
   await radiobutton.check();

   const dropdown = page.getByLabel("Gender");
   await dropdown.selectOption("Female");

   const submitbutton = page.getByRole("button",{name:"Submit"});
   await submitbutton.click();

   await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

   await page.getByRole("link",{name: "Shop"}).click();
}
);

test('client', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    //const email = page.locator("#userEmail");
    const email = page.getByPlaceholder("email@example.com");
    await email.fill("rum@gmail.com");

    //const password = page.getByPlaceholder("enter your password");
    const password = page.locator("#userPassword");
    await password.fill("SwanLake#14");

    const submitbutton = page.getByRole("button",{name:"Login"});
    submitbutton.click();

    const title = await page.title();
    expect(title).toBe("Let's Shop");
}
);