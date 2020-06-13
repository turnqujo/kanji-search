/**
 * KLUDGE - What is this file for?
 *  Since the app code is bundled with CSS, settings like dark mode, font size, etc.
 *  aren't loaded until later in the page render, causing the background color of
 *  the viewport to flash a flat white. This is incredibly jarring for the user,
 *  so this code will "shiv" the settings in place before the application loads.
 */
;(function(rootEle) {
  if (!rootEle) {
    return
  }

  if (localStorage.getItem('kn-theme-preference') === 'dark') {
    rootEle.setAttribute('dark', true)
  }

  const fontSizePreference = localStorage.getItem('kn-font-size-preference')
  if (['xsmall', 'small', 'medium', 'large', 'xlarge'].indexOf(fontSizePreference) > -1) {
    rootEle.setAttribute('font-size', fontSizePreference)
  }

  const animationPreference = localStorage.getItem('kn-animation-preference')
  if (animationPreference === 'disabled') {
    rootEle.classList.add('transitions-disabled')
  }
})(document.querySelector(':root'))
