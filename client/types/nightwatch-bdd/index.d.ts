// TODO: This is being copy-pasted into node_modules/@types/nightwatch manually.
// How to include this file?
declare global {
    // @ts-ignore
    function describe(description: string, cb: (browser: NightwatchBrowser) => void): void
    // @ts-ignore
    function before(cb: (browser: NightwatchBrowser) => void): void
    // @ts-ignore
    function after(cb: (browser: NightwatchBrowser) => void): void
    // @ts-ignore
    function test(description: string, cb: (browser: NightwatchBrowser) => void): void
}

// Only needed here since it's global
export {}
