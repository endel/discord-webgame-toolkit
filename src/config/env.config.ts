import path from "path";

// const envfile = path.resolve(__dirname, "..", "..", `.${process.env.NODE_ENV || "development"}.env`);
const envfile = path.resolve(__dirname, "..", "..", `.env`);

require('dotenv').config({ path: envfile });