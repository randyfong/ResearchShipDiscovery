from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://vessels.greenwaterfoundation.org/#/ships", wait_until="networkidle", timeout=15000)
    if page.locator('input[aria-label="Email"]').count() > 0:
        page.locator('input[aria-label="Email"]').fill('randyfong@aol.com')
        page.locator('input[aria-label="Password"]').fill('mypgup-zugKu2-xipsyj')
        page.locator('button:has-text("Login")').click()
        page.wait_for_timeout(3000)
    page.wait_for_timeout(2000)
    print("Page title:", page.title())
    print(page.locator("body").inner_text()[:500])
    browser.close()
