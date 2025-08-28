// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';

test('has title', async ({ page }) => {
  await page.goto('https://google.com');
});

test('get started link', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
 
  const username = page.locator('#username');
  await username.fill('rahulshetty');

  const password = page.locator('#password');
  await password.fill('learning');

  const loginbutton = page.locator('input#signInBtn');
  //const loginbutton = page.locator('#signInBtn');
  //const loginbutton = page.locator("[type='submit']");
  await loginbutton.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

test('empty field test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    await username.fill("");

    const password = page.locator("[id='password']");
    password.fill("");

    const loginbutton = page.locator('input#signInBtn');
    await loginbutton.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Empty');
});

test('valid login', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    await username.fill("rahulshettyacademy");

    const password = page.locator("[id='password']");
    password.fill("learning");

    const loginbutton = page.locator('input#signInBtn');
    await loginbutton.click();
    
    await page.waitForLoadState('networkidle');
    const items = page.locator(".card-body a");
    //console.log(await items.first().textContent());
    //console.log(await items.nth(1).textContent());
    console.log(await items.allTextContents());
});

test('register new user', async ({page})=>
{
   await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

   const firstname = page.locator('#firstName');
   await firstname.fill("John");

   const lastname = page.locator('#lastName');
   await lastname.fill("Doe");

   const email = page.locator('#userEmail');
   await email.fill("test@gmail.com");

   const phonenumber = page.locator('#userMobile');
   await phonenumber.fill("9348905840");
}
);

test('login to client', async ({page})=>
{
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

   const clientemail = page.locator('#userEmail');
   await clientemail.fill("rum@gmail.com");

   const lastname = page.locator('#userPassword');
   await lastname.fill("SwanLake#14");

   const email = page.locator('input#login');
   await email.click();

   //Wait for the network to be idle after login
   await page.waitForLoadState('networkidle');

   const products = page.locator('.card-body b');
   console.log(await products.allTextContents());

}
);


test('login page practice', async ({page})=>
  {
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

     //Fill in the username
     const username = page.locator("#username");
     await username.fill("rahulshettyacademy");

     //Fill in the password
     const password = page.locator("#password");
     await password.fill("learning");

     //check the radio button
     const radiobutton = page.locator("input[type='radio']");
     await radiobutton.last().click();
     await expect(radiobutton.last()).toBeChecked();
     console.log(await radiobutton.last().isChecked());

     //click the OK button
     await page.locator("#okayBtn").click();

     //select the dropdown option
     const dropdown = page.locator("select.form-control");
     await dropdown.selectOption('Consultant');

     //Accept the terms and conditions
     const termsCheckbox = page.locator("#terms");
     await termsCheckbox.click();
     await expect(termsCheckbox).toBeChecked();
     console.log(await termsCheckbox.isChecked());

     //uncheck the terms and conditions
     await termsCheckbox.uncheck();
     expect(await termsCheckbox.isChecked()).toBeFalsy();

     


  }
);

test('blink text test', async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  //blinking text
  const blinkingText = page.locator("[href*='documents-request']");
  await expect(blinkingText).toHaveAttribute('class','blinkingText');

  //click on the blinking text
  const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  blinkingText.click(),
])
 const newPageText = await newPage.locator('.red').textContent();
 console.log(newPageText);
 const arrayName = newPageText.split("@");
 const splitted = arrayName[1].split(" ")[0];
 console.log(splitted);
 await page.locator('#username').fill(splitted);
 console.log(await page.locator("#username").inputValue());
}
);