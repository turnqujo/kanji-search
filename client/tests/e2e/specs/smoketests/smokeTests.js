// TODO: Type definitions for Nightwatch BDD Functions (Not in the @types package yet)
// @ts-ignore
describe('Smoke tests of the app.', () => {
  // @ts-ignore
  before((browser) => {
    browser.init()
  })

  // @ts-ignore
  after((browser) => {
    browser.end()
  })

  // @ts-ignore
  test('It should perform a simple search.', (browser) => {
    const kanjiSearch = browser.page.kanjiSearch()
    kanjiSearch.waitForElementVisible('@appContainer')

    const app = kanjiSearch.section.app
    app.waitForElementVisible('@navContainer')

    const form = app.section.form
    form.waitForElementVisible('@submitButton').submitForm('@submitButton')

    const results = app.section.results
    results.waitForElementVisible('@kanjiRows')
  })
})
