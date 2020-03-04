# What's going on here?
This directory contains:
- WebWorkers; written in TypeScript, compiled and delivered separately from the rest of the app. Do not import these files directly.
- Tests; written in Jest, using a custom-built webworker hoist for runnning them in a Node environment.
- Wrappers; written in TypeScript, intended to be imported by application code.

# Webworkers
[Spec](https://html.spec.whatwg.org/multipage/workers.html)

## Performance
Transferring data from the main thread to and from workers can be slow, due to
the browser making copies of the data being passed. [This article](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-transferrables) discusses how to avoid this problem.

## Subworkers
Workers being able to call on other workers would be great to support. However,
the Test Env Worker does not yet support this. The subworker would need to be
adjusted before compiling so that it creates another TestEnvWorker instead of a
new Worker, but this may cause other issues in itself.
