import session from "express-session";

const SESSION_SECRET = process.env.SESSION_SECRET!;
if (!SESSION_SECRET) { throw new Error("process.env.SESSION_SECRET must be set."); }

// import redis from "redis";
// import connectRedis from "connect-redis";

// const client = redis.createClient();
// const RedisStore = connectRedis(session);

export default session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // true
  // store: new RedisStore({ client: client }),
});