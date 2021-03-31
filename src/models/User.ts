import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne, BeforeUpdate } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  // auth-related data
  @Property() discord_id!: string;
  @Property() username!: string;
  @Property() email!: string;
  @Property() locale!: string;

  // Add more properties here! 
  // See documentation => https://mikro-orm.io/docs/defining-entities
}