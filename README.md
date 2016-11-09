# Todoist Sync Node API
[![Build Status](https://travis-ci.org/alexdunne/todoist-sync-node-api.svg?branch=master)](https://travis-ci.org/alexdunne/todoist-sync-node-api)
[![Code Climate](https://codeclimate.com/github/alexdunne/todoist-sync-node-api/badges/gpa.svg)](https://codeclimate.com/github/alexdunne/todoist-sync-node-api)

A wrapper around the [Todoist Sync API](https://developer.todoist.com/?shell#api-overview) written in Javascript.

When a method on a resource is called (e.g. projects, items) a command is created and added to a queue. To send these commands to the Todist Sync API the commit method must be called.

Each method called on a resource returns the local temp_id for that command. This allows multiple resources to be created in a single command. This is especially useful when you wish to create resources which depend on each other in a single request.
