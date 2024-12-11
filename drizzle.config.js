/** @type { import("drizzle-kit").Config} */
export default{
  schema : "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:eCx9BYwStzI2@ep-soft-rice-a51dgyqh.us-east-2.aws.neon.tech/Ai%20Interview%20application?sslmode=require',
  }
};