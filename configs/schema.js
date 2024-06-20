import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const JsonForms = pgTable('jsonForms', {
  id: serial('id').primaryKey(),
  theme: varchar('theme'),
  background: varchar('background'),
  title: varchar('title'),
  jsonform: text('jsonform').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
});
