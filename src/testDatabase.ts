
import { pool } from "./config/database.js";

async function testDatabase() {
  try {
    const result = await pool.query("SELECT * FROM vehicles");

    console.log("Database connection successful!");
    console.table(result.rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end();
  }
}

testDatabase();
