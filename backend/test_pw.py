from playwright.sync_api import sync_playwright
import time
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://vessels.greenwaterfoundation.org/#/ships")
    time.sleep(2)
    print(page.content()[:1000])
    browser.close()
