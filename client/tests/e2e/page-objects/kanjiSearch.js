module.exports = {
  url: '/',
  commands: [],
  elements: {
    appContainer: '#app'
  },
  sections: {
    app: {
      selector: '#app',
      elements: {
        navContainer: '#kn-nav'
      },
      sections: {
        navigation: {
          selector: '#kn-nav',
          elements: {
            homeAnchor: 'a[data-tid=home]',
            settingsAnchor: 'a[data-tid=settings]'
          }
        },
        form: {
          selector: '.kanji-form',
          elements: {
            meaningText: 'input[data-tid=meaning-text]',
            // meaningMatchOption: '',
            // readingText: '',
            // readingMatchOption: '',
            // readingTypeOn: '',
            // readingTypeKun: '',
            // readingTypeNanori: '',
            // kanjiKeyboardToggle: '',
            // kanjiSetJouyou: '',
            // kanjiSetJinmeiyou: '',
            // kanjiSetKyouiku: '',
            // kanjiSetJlpt: '',
            // kanjiSetHyougai: '',
            // primarySortField: '',
            // primarySortDirection: '',
            // secondarySortField: '',
            // secondarySortDirection: '',
            // clearButton: '',
            submitButton: 'button[type=submit]'
          }
        },
        // kanaKeyboard: {},
        results: {
          selector: '.kn-results',
          elements: {
            foundCount: 'span[data-tid=result-count]',
            // previousButton: '',
            // nextButton: '',
            // perPageSelection: ''
            kanjiCards: '.kanji-card'
          }
        }
      }
    }
  }
}
