import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load and display categories', async ({ page }) => {
    await page.goto('/')

    // Wait for content to load
    await page.waitForSelector('h2', { timeout: 10000 })

    // Check for category headings
    const headings = await page.locator('h2').allTextContents()
    expect(headings.length).toBeGreaterThan(0)
  })

  test('should open modal on card click', async ({ page }) => {
    await page.goto('/')

    // Wait for project cards
    await page.waitForSelector('[class*="cursor-pointer"]', { timeout: 10000 })

    // Click first project card
    const firstCard = page.locator('[class*="cursor-pointer"]').first()
    await firstCard.click()

    // Check if modal is visible
    await expect(page.locator('text=Tech Stack')).toBeVisible({ timeout: 5000 })
  })
})




