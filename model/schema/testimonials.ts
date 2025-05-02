import { timestamp, pgTable, integer, serial, varchar, text } from 'drizzle-orm/pg-core';
import { projects } from './projects';

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  projectId: text('project_id')
    .references(() => projects.id)
    .notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  authorName: varchar('author_name', { length: 100 }).notNull(),
  authorRole: varchar('author_role', { length: 100 }).notNull(),
  authorAvatarUrl: text('author_avatar_url'),
  content: text('content').notNull(),
  rating: integer('rating').notNull(),
  status: varchar('status', { length: 20 }).default('published'),
  createdAt: timestamp('created_at').defaultNow()
});
