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
