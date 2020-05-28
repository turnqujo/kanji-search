export default function setRootTheme(isDark: boolean) {
  const rootClasses = document.querySelector(':root')?.classList
  if (isDark) {
    rootClasses?.remove('theme--light')
    rootClasses?.add('theme--dark')
  } else {
    rootClasses?.remove('theme--dark')
    rootClasses?.add('theme--light')
  }
}
