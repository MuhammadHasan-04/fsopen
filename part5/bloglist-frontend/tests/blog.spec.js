// const { test, expect } = require('@playwright/test')

// test.describe('Blog app', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:5173');
//   })

//   test('Login form is shown', async ({ page }) => {
//     await expect(page.getByText('log in to application')).toBeVisible();
//     await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
//     await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
//     await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
//   })
// })


///////////////Part 2 /////////////


// const { test, expect } = require('@playwright/test');

// test.describe('Blog app', () => {
//   test.beforeEach(async ({ page, request }) => {
//     await request.post('http://localhost:3003/api/testing/reset')

//     await request.post('http://localhost:3003/api/users', {
//       data: {
//         username: 'testuser',
//         name: 'Test User',
//         password: 'password123'
//       }
//     })

//     await page.goto('http://localhost:5173')
//   })

//   test('Login form is shown', async ({ page }) => {
//     await expect(page.getByText('log in to application')).toBeVisible()
//     await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
//     await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
//     await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
//   })

//   test.describe('Login', () => {
//     test('succeeds with correct credentials', async ({ page }) => {
//       await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
//       await page.getByRole('textbox', { name: 'Password' }).fill('password123')
//       await page.getByRole('button', { name: 'login' }).click()

//       await expect(page.getByText('Test User logged in')).toBeVisible()
//     })

//     test('fails with wrong credentials', async ({ page }) => {
//       await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
//       await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword')
//       await page.getByRole('button', { name: 'login' }).click()

//       await expect(page.getByText('invalid username or password')).toBeVisible()
//     })
//   })
// })




//////////pArt 3
test.describe('When logged in', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
    await page.getByRole('textbox', { name: 'Password' }).fill('password123')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()

    await page.getByRole('textbox', { name: 'Title' }).fill('Playwright')
    await page.getByRole('textbox', { name: 'Author' }).fill(' Bot')
    await page.getByRole('textbox', { name: 'Url' }).fill('https://playwright.dev')

    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByText('E2E Testing with Playwright Playwright Bot')).toBeVisible()
  })
})

//liking
test.describe('When a blog exists', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
    await page.getByRole('textbox', { name: 'Password' }).fill('password123')
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByRole('textbox', { name: 'Title' }).fill('Likeable Blog')
    await page.getByRole('textbox', { name: 'Author' }).fill('Playwright Bot')
    await page.getByRole('textbox', { name: 'Url' }).fill('https://playwright.dev')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()
  })

  test('a blog can be liked', async ({ page }) => {
    await expect(page.getByText('likes 0')).toBeVisible()

    await page.getByRole('button', { name: 'like' }).click()

    await expect(page.getByText('likes 1')).toBeVisible()
  })
})
