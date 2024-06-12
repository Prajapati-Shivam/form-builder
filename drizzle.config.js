import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './configs/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://form-builder_owner:f8K5GFeIEpaq@ep-calm-base-a52x02un.us-east-2.aws.neon.tech/form-builder?sslmode=require',
  },
});
