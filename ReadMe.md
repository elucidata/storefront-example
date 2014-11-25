# Storefront Example


Instead of a typical 'Todo' app, which doesn't show how Stores interact with one another, this is a simple time tracking application.

Still a work in progress, but it gives you a good idea of how to use Storefront.

See it live here:

> http://elucidata.github.io/storefront-example/

## The Stores

**Projects**

Maintains the list of projects you can log time to. [See the schema...](app/stores/schema/project.js)

**Entries**

Individual time entries, related to projects via a `projectId` field. [See the schema...](app/stores/schema/entry.js)

**Timer**

State for global timer object.

### Store Flow

- UI starts a timer, sending the `Timer` store a `projectId`
- UI stops the the timer:
  - `Entries` store listens for the `Timer_stop` action and creates an entry with the
    appropriate data.
  - `Projects` store listens for the `Entries_add` action and updates the `time`
    attribute on the appropriate project.


## Todo

- [ ] Full crud
- [ ] Persist to localStorage
- [ ] Add LessCss support
