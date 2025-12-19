import { test, expect } from '@playwright/test'

test.describe('Admin', () => {
  test('should login and create project', async ({ page }) => {
    await page.goto('/dashboard')

    // Fill login form
    await page.fill('input[type="email"]', process.env.ADMIN_EMAIL || 'admin@devflix.com')
    await page.fill('input[type="password"]', process.env.ADMIN_PASSWORD || 'admin123')
    await page.click('button[type="submit"]')

    // Wait for dashboard to load
    await page.waitForSelector('text=Projects', { timeout: 10000 })

    // Click Add Project
    await page.click('text=Add Project')

    // Fill project form
    await page.fill('input[name="title"]', 'E2E Test Project')
    await page.fill('input[name="slug"]', 'e2e-test-project')
    await page.fill('input[name="tagline"]', 'E2E Test')
    await page.fill('textarea[name="description"]', 'This is an E2E test project')
    await page.fill('input[name="role"]', 'Tester')

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for success (project should appear in list)
    await expect(page.locator('text=E2E Test Project')).toBeVisible({ timeout: 5000 })
  })
})



