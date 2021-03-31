import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import options from './mikro-orm.config';

import { User } from '../models/User';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
};

export async function connect() {
  DI.orm = await MikroORM.init(options);

  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
}
