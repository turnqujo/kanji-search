- What's going on here?
  These components are adding, removing, or modifying attributes on
:root (<html>). They are written this way so that their functionality
and changes are applied and available globally, e.g. the user's color
scheme or animation mixins.

- Couldn't these components encapsulate arbitrary content, scoping their
functionality, variables, etc. to only their children? Why do they need
to target :root?
  These components could be scoped in that way. They will likely be
replaced in the future (TODO), since targeting parent elements using
document.querySelector() isn't exactly ideal from within VueJS components.
