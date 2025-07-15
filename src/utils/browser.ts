import type { Browser, BrowserContext, Page, Locator } from 'patchright'
import { chromium } from 'patchright'
import { CONFIG } from '../config'
import { verboseLog } from './log'

let PAGE_SINGLETON: Page | null = null
let BROWSER_SINGLETON: Browser | null = null
let CONTEXT_SINGLETON: BrowserContext | null = null
// Toggle this to true if accepting cookies or logging in is something necessary to scrape.
let FIRST_TIME: boolean = false

const authFile = 'playwright/.auth/user.json'

/**
 * Returns a shared browser instance.
 *
 * Note: The type of this function is `Page`
 * but in Playwright parlance, `Page` is the
 * "browser" (actually a tab in the browser),
 * so this is what we return because it semantically
 * makes more sense.
 *
 * @returns {Promise<Page>}
 */
export async function getBrowserInstance(): Promise<Page> {
	if (PAGE_SINGLETON != null) {
		return PAGE_SINGLETON
	}

	const browser = await chromium.launch({
		headless: CONFIG.HEADLESS,
		// devtools: true,
		slowMo: 100,
		channel: 'chrome',
	})
	const context = await browser.newContext()
	const page = await context.newPage()

	PAGE_SINGLETON = page
	BROWSER_SINGLETON = browser
	CONTEXT_SINGLETON = context

	return page
}

/**
 * Closes the shared browser instance.
 *
 * @returns {Promise<void>}
 */
export async function closeBrowser(): Promise<void> {
	if (PAGE_SINGLETON == null || BROWSER_SINGLETON == null || CONTEXT_SINGLETON == null) {
		return
	}

	await PAGE_SINGLETON.close()
	await CONTEXT_SINGLETON.close()
	await BROWSER_SINGLETON.close()

	PAGE_SINGLETON = null
	BROWSER_SINGLETON = null
	CONTEXT_SINGLETON = null
}

export async function acceptCookies(url: string) {
	const browser = await getBrowserInstance()
	await browser.context().clearCookies()
	await browser.goto(url)

	// accept cookies
	const allowAllCookies = browser.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
	await allowAllCookies.click()
}

export async function logInOnce(url: string) {
	const browser = await getBrowserInstance()
	await browser.goto(url)

	// log in
	const signin = browser.locator('.navsignin')
	signin.click()
	const loginInput = browser.getByPlaceholder('Username').locator('visible=true')
	await loginInput.pressSequentially(process.env.HLTV_LOGIN ?? '')
	const pwInput = browser.getByPlaceholder('Password')
	await pwInput.pressSequentially(process.env.HLTV_PASSWORD ?? '')
	const button = browser.locator('button.login-button.button')
	await button.click()
	// End of authentication steps.
	await browser.context().storageState({ path: authFile })
	await browser.waitForTimeout(10000)
}

/**
 * Navigates to the given URL and waits for the given selector to be visible.
 *
 * @param url The URL to navigate to.
 * @param waitForVisible The selector to wait for.
 * @returns {Promise<Locator>} The locator for the given selector.
 */
export async function navigateTo(url: string, waitForVisible: string): Promise<Locator> {
	// Add a random delay of 1 to 10 seconds to simulate human behavior
	await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 10000)))

	if (FIRST_TIME) {
		verboseLog('First time navigating, accepting cookies and logging in.')
		await logInOnce(url)
		FIRST_TIME = false
	}

	const page = await getBrowserInstance()
	await page.context().storageState({ path: authFile })

	await page.goto(url)

	const container = page.locator(waitForVisible)

	return container
}
