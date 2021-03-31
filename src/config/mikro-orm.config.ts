import { Options } from '@mikro-orm/core';

import { User } from '../models/User';
import { BaseEntity } from '../models/BaseEntity';

const options: Options = {
  type: 'mongo',
  entities: [User, BaseEntity],
  dbName: 'brawlball',
  logger: console.log.bind(console),
  debug: true,
  clientUrl: process.env.MONGO_CLIENT_URL || process.env.MONGO_URI  || 'mongodb://localhost:27017'
};

export default options;