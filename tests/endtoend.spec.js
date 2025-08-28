import {test, expect} from '@playwright/test';

test('client login test', async ({page}) => 
{
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  
  const productName = 'ADIDAS ORIGINAL';

  const products = page.locator('.card-body');

  const email = page.locator('#userEmail');
  await email.fill('rum@gmail.com');

  const password = page.locator('#userPassword');
  await password.fill('SwanLake#14');

  const submitbutton = page.getByRole('button', {name: 'Login'});
  await submitbutton.click();

  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const title = await page.locator(".card-body b").allTextContents();
  console.log(title);

  const count = await products.count();
  console.log(count);

  

  // Loop through the products and log each one
  for(let i=0;i<count;++i)
  {
      
    if(await products.nth(i).locator("b").textContent() === productName)
    {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
        
  }
await page.locator("[routerlink*=cart]").click();
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
expect(bool).toBeTruthy();

await page.locator("[type='button']").last().click();

await page.locator("[placeholder*='Country']").pressSequentially("ind");

const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for(let i=0;i<count;i++)
{
  dropdown.locator("button").nth(i) 
}

});