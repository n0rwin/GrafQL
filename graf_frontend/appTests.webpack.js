let context = require.context('./app', true, /_test\.js$/);
context.keys().forEach(context);
