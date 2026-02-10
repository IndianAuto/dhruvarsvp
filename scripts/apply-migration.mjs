import pg from "pg";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function applyMigration() {
  const client = new pg.Client({
    host: "127.0.0.1",
    port: 54322,
    database: "postgres",
    user: "postgres",
    password: "postgres",
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    const sql = await readFile(
      join(__dirname, "..", "supabase", "migrations", "001_create_rsvps.sql"),
      "utf-8"
    );

    await client.query(sql);
    console.log("Migration applied successfully!");

    // Verify
    const res = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'rsvps' ORDER BY ordinal_position"
    );
    console.log("\nTable columns:");
    res.rows.forEach((r) => console.log(`  ${r.column_name}: ${r.data_type}`));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.end();
  }
}

applyMigration();
