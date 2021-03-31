import express from "express";
import { GrantSession } from "grant";

import { DI } from "../config/database.config";
import { generateJWT, getUserFromToken } from "../config/jwt.config";

const auth = express.Router();

auth.get("/", async (req: express.Request, res: express.Response) => {
  const token = req.query['token'] as string;
  const response: any = { user: undefined };

  try {
    response['user'] = (token) ? await getUserFromToken(token) : undefined;
  } catch (e) {}

  res.json(response);
});

auth.get("/discord/callback", async (req, res) => {
  const session = req.session as typeof req.session & { grant: GrantSession };
  const grant = session.grant;
  const profile: any = grant?.response?.profile;

  //
  // "dynamic" are the query parameters you provide for the first "/connect/:provider" request.
  //
  // const dynamic: any = grant?.dynamic;

  if (profile) {
    // try to find existing user
    let user = await DI.userRepository.findOne({
      discord_id: profile['id']
    });

    // register a new user
    if (!user) {
      user = DI.userRepository.create({
        discord_id: profile['id'],
        username: profile['username'],
        email: profile['email'],
        locale: profile['locale'],
      });

      await DI.userRepository.persistAndFlush(user);
    }

    const response = {
      user,
      token: generateJWT(user),
    };

    res.send(`<!html><html><head><script type="text/javascript">
  window.opener.postMessage(${JSON.stringify(response)}, '*');
  </script></head><body></body></html> `);
    res.end();

  } else {
    console.error("can't retrieve user profile.");
    res.status(500);
    res.json({ error: "can't retrieve user profile." })
  }
});

export default auth;