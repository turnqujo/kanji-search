# Kanji Search

## What is this Project?
This project is primarily a tech demonstration of [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API),
showing how they can be created with TypeScript and unit tested with Jest.

It was also created as a personal exploration into VueJS with TypeScript.

There are better tools available for finding specific kanji, such as [Jisho](https://jisho.org/), but this app could be
used for that purpose.

## How do I build the App?
This app was built with the Vue CLI, and is largely conventional with two caveats:
1. The VueJS app lives in /client. This is to allow for later expansion, such as an API.
2. `npm run-script build` _must_ be ran before the app will have funcionality. This script also builds the Web Workers.
Changing webworker files will also require a rebuild, except when testing.

## Interesting Parts

### `src/workers`
This directory contains all the Web Workers. Web Workers are not modules (Except for in [Chrome 80+](https://web.dev/module-workers/),
but not used in this project), so they need to be compiled separately. They are then placed in the `public/workers` directory,
and obtained through their "wrapper" helper functions, which use a simple `fetch`.

### `src/workers/__tests__`
The spec files should be pretty straight-forward, with exception of the use of the "Test Env Worker". This class will
load, compile, and exec the given worker file, allowing for it to be targeted by unit tests and have access to external
code, such as `isomorphic-fetch`. Unfortunately, this approach is not perfect, and is not 100% completed. However, it
does allow for more than adequate testing for this app. Coverage, though, cannot be collected.

### `public/preload`
These files are loaded into the browser before and separate from the app itself. They are responsible for
things like setting the background color of the root element. This prevents the background from "flashing"
white when reloading the page, if the user has dark mode enabled. I'm sure there's a better way to handle this.

## Acknowledgments

### Data Sources
The kanji data, such as their character, meanings, readings, etc. were sourced from the [KANJIDIC Project](http://www.edrdg.org/wiki/index.php/KANJIDIC_Project),
more specifically the KANJIDIC2 XML file. This file was parsed into JSON, keeping only the data relevant to the app.

The frequency data (popularity of kanji) was derived from [this project](https://github.com/scriptin/kanji-frequency).
More specifically, the [Wikipedia dump](https://github.com/scriptin/kanji-frequency/blob/master/data/wikipedia.json).
This data was referenced by a script which combined it with a set of kanji obtained from other sources.
