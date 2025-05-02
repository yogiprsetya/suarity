import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as users from '~/model/schema/users';
import * as projects from '~/model/schema/projects';
import * as testimonials from '~/model/schema/testimonials';

const client = postgres(process.env.POSTGRES_URL || '', { prepare: false });

const db = drizzle(client, {
  schema: { ...users, ...projects, ...testimonials }
});

export { db };
