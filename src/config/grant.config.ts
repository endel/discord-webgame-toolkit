const grant = require('grant').express();

export default grant({
  defaults: {
    origin: process.env.BACKEND_URL,
    transport: "session",
    state: true
  },

  discord: {
    key: process.env.DISCORD_CLIENT_ID,
    secret: process.env.DISCORD_CLIENT_SECRET,
    scope: ['identify', 'email'],
    response: ['tokens', 'profile'],
    callback: '/auth/discord/callback',
  },

});