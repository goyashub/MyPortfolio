import { test, expect } from '@playwright/test'

test.describe('Search', () => {
  test('should filter results', async ({ page }) => {
    await page.goto('/search?q=swift')

    // Wait for results or no results message
    await page.waitForSelector('h1', { timeout: 10000 })

    const heading = await page.locator('h1').textContent()
    expect(heading).toContain('Search results')
  })
})



