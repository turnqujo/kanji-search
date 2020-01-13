# Webworkers
[Spec](https://html.spec.whatwg.org/multipage/workers.html)

# Webworkers - Main Issues
## Cannot be modules
- Support for the "module" Worker type is unknown. Caniuse doesn't even display
  it, and MDN doesn't discuss it.
  - If it does work, keep this in mind from the spec:
  > Additionally, the importScripts() method will automatically fail inside module workers
- Thanks to the Test Env Worker, the webworker files can be loaded just fine.
  However, testing webworker utilities is very wonky due to how difficult it is
  to get the non-module code into the testing context.
- Importing interfaces doesn't work with this approach. How can types be shared
  between webworker files?
  - A possible solution could be to have two configuration setups, one for
    testing, which allows the webworkers to be modules, and another which strips
    the module-related code off. This solution sounds klunky.

## Performance
Transferring data from the main thread to and from workers can be slow, due to
the browser making copies of the data being passed. [This article](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-transferrables) discusses how to avoid this problem.

## Subworkers
Workers being able to call on other workers would be great to support. However,
the Test Env Worker does not yet support this. The subworker would need to be
adjusted before compiling so that it creates another TestEnvWorker instead of a
new Worker, but this may cause other issues in itself.
