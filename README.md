# Discord Web Game Toolkit 

> Please do not share copies of this document and source-code. Although I love open-source, this project is not open. See LICENSE file.

The code on this repository is a Node.js application that you can either copy the files over to your existing Node.js application, or build your own stuff on top of it. You should deploy this code on your own server in order to have it working for your game.

<img src="images/discord-auth.png" width="30%" align="left" />
<img src="images/discord-bot-demo.png" width="63%" />

**What's included here?**

- Discord OAuth Integration
- Discord Bot with a `!profile` command to output the player's profile.
- Express routes to authenticate with Discord
- A `User` model with default properties, and a database setup. You can add more models as you need.

**Node modules in use:**
- [MikroORM](https://www.npmjs.com/package/@mikro-orm/core) + [MongoDB](https://www.npmjs.com/package/mongodb) for database access.
- [Grant](https://www.npmjs.com/package/grant) for OAuth integration. Only Discord is being used, but you can easily use more providers such as Google, Twitter, etc.
- [Express](https://www.npmjs.com/package/express) for binding Grant routes, and custom login.
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) for encrypting and exposing a token containing the `discord_id` for the client-side.
- [Discord.js](https://www.npmjs.com/package/discord.js) for Discord Bot integration.

# Setup Instructions

## Setting up your local environment

- [Download and install Node.js v14](https://nodejs.org/en/)
- [Download and install MongoDB Community Edition](https://www.mongodb.com/try/download/community) 
- [Download and install Visual Studio Code](https://code.visualstudio.com/) (or other editor of your choice)

To run the project locally, open the folder of this package on your terminal, and run the following commands:

```
npm install
npm start
```

You should see the following logs:

```
> discord-webgame-toolkit@1.0.0 start
> ts-node-dev src/index.ts

[INFO] 13:07:50 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.1.3)
[discovery] ORM entity discovery started, using ReflectMetadataProvider
[discovery] - processing entity User
[discovery] - processing entity BaseEntity
[discovery] - entity discovery finished, found 2 entities, took 16 ms
[info] MikroORM successfully connected to database discord_webgame_toolkit on mongodb://localhost:27017
Database connected.
Listening on ws://localhost:3000
Application v1.0.0 ready.
Discord bot logged in as Webgame Toolkit#3978!
```

## Discord Authentication

Go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and click on "New Application".

![Click on New Application](images/discord-new-application.png)

After having your application created, you need to copy both your **CLIENT ID** and **CLIENT SECRET**, and paste it into the `.env` file.

![Client and Secret](images/discord-application-id.png)

In the `.env` file, these values will look like this:

```
DISCORD_CLIENT_ID=790647592480276541
DISCORD_CLIENT_SECRET=20fgvLavtsc87sMXYdV6ETeSI92LwP8m
```

Add OAuth Redirect to all possible deployments of your game. You should have at least two entries here:

![OAuth Redirects](images/discord-oauth-redirects.png)

- `http://localhost:3000/connect/discord/callback`: For testing locally.
- `http://yourgame.io/connect/discord/callback`: For the live game (replace `yourgame.io` to where your game is deployed remotely!)

## Discord bot

Now let's create the bot for your Discord application:

![Add Bot](images/discord-bot-add.png)

Copy the "token" of your bot, and paste it into the `.env` file as well.

![Add Bot](images/discord-bot-token.png)

In the `.env` file, the token will look like this:

```
DISCORD_BOT_TOKEN=NzkwNjQ3NTkyNDgwMjc2NTQx.X-Dp8w.hBQGt-ioJKvaIgdWp0NPFRPIa-w
```

## Adding the bot to your server

The last step is to add the bot into your server. 

1. Select "OAuth" in the sidebar.
2. In the "OAuth2 URL Generator", under "scopes" - select "bot".
3. Under "Bot permissions", select "Send Messages", and "Embed links". You may select more options if you are going to implement more features on your own!

![Add Bot To Your Server](images/discord-oauth-addbot.png)

Now, click on "Copy" in the authorization URL, and open it in your browser. You will be asked to select the server the bot is going to join:

![Add Bot To Your Server](images/discord-oauth-addbot-authorize.png)

You're done! Have fun making custom bot actions for your game!

# Modifying the source-code

The source-code on this repository is very simple, and should be easily exchangeable if you'd like to move it over to an existing project.

## The `User` model and MikroORM

MikroORM is an object–relational mapping that supports multiple database engines. On the current set-up, this project uses MongoDB, as you can see on `src/config/mikro-orm.config.ts`:

```typescript
// ...
const options: Options = {
  type: 'mongo',
  entities: [User, BaseEntity],
  dbName: 'discord_webgame_toolkit',
// ...
```

[See MikroORM documentation](https://mikro-orm.io/docs/installation) if you'd like to use a different database engine.

## The Discord Bot logic

You can find the Discord Bot logic at `src/config/discord-bot.config.ts`. The discord.js API is quite extensive and is very versatile. You can see the full documentation of its capabilities at [discord.js.org](https://discord.js.org/#/docs/).


## Deployment

After you deploy this on your own server, make sure to update the `BACKEND_URL` in your `.env` file. This step is fundamental due to the way OAuth handle redirects internally.

```
BACKEND_URL=https://gamestd.io
```

Above is a real-world example of how this is currently set-up for the [public demo](https://endel.dev/discord-webgame-toolkit).

# Community

<a href="https://discord.gg/dqTw2cKrAe">Join the Discord Test server.</a>

# License

Copyright © Endel Dreyer. See [LICENSE.md](LICENSE.md) for more details.