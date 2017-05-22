let context = require.context('./shared', true, /_test\.js$/);
context.keys().forEach(context);
