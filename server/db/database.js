import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = path.resolve("server", "data");
const dbPath = process.env.DATABASE_PATH || path.join(dataDir, "lms.sqlite");

fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(path.resolve("server", "db", "schema.sql"), "utf8");
db.exec(schema);

export function json(value) {
  return JSON.stringify(value ?? {});
}

export function parseJson(value, fallback = {}) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
