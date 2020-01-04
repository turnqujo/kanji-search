onmessage = (e: MessageEvent) => {
  fetch("https://www.duckduckgo.com")
  .then(res => {
    const dbcon = indexedDB.open('example')

    dbcon.onupgradeneeded = _ => {
      postMessage(res.status, '*')
    }
  })
}
