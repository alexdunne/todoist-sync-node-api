# Todoist sync node api
A wrapper around the [todoist sync api](https://developer.todoist.com/?shell#api-overview) written in Javascript.

When a method on a resource is called (e.g. projects, items) a command is created and added to a queue. The send these commands to the Todist Sync API the commit method must be called.

Each method called on a resource returns the local temp_id for that command. This allows multiple resources to be created in a single command. This is especially useful when you wish to create both an project and an item in a single request.