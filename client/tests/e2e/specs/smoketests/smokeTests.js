describe('Smoke tests of the app.', () => {
  before((browser) => {
    browser.init()
  })

  after((browser) => {
    browser.end()
  })

  test('It should perform a simple search.', (browser) => {
    const kanjiSearch = browser.page.kanjiSearch()
    kanjiSearch.waitForElementVisible('@appContainer')

    const app = kanjiSearch.section.app
    app.waitForElementVisible('@navContainer')

    const form = app.section.form
    form.waitForElementVisible('@submitButton').submitForm('@submitButton')

    const results = app.section.results
    results.waitForElementVisible('@kanjiCards')

    results.expect.element('@foundCount').text.not.to.equal('0')
  })
})
