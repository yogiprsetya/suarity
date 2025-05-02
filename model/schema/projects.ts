import { timestamp, pgTable, text, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const userTypeEnum = pgEnum('project_type', ['on-demand', 'just-in-time']);

export const projects = pgTable('projects', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  type: userTypeEnum('type').notNull().default('on-demand'),
  description: varchar('description', { length: 250 }),
  createdAt: timestamp('created_at').defaultNow()
});
