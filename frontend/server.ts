import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("innovation_az.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    name TEXT,
    profile_data TEXT
  );

  CREATE TABLE IF NOT EXISTS startups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    sector TEXT,
    stage TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    investor_id INTEGER,
    startup_id INTEGER,
    amount REAL,
    date TEXT,
    FOREIGN KEY(investor_id) REFERENCES users(id),
    FOREIGN KEY(startup_id) REFERENCES startups(id)
  );
`);

// Seed initial data if empty
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare("INSERT INTO users (email, password, role, name, profile_data) VALUES (?, ?, ?, ?, ?)");
  insertUser.run("admin@innovation.az", "admin123", "ADMIN", "System Administrator", JSON.stringify({ dept: "IT" }));
  insertUser.run("investor@vc.com", "investor123", "INVESTOR", "Global VC Fund", JSON.stringify({ focus: ["SaaS", "FinTech"] }));
  insertUser.run("founder@startup.az", "founder123", "STARTUP", "Ali Mammadov", JSON.stringify({ startup_name: "Nexus AI" }));
  insertUser.run("mentor@expert.com", "mentor123", "MENTOR", "Leyla Aliyeva", JSON.stringify({ expertise: ["Marketing", "Strategy"] }));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json({ success: true, user: userWithoutPassword });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/profile/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id) as any;
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  app.get("/api/startups", (req, res) => {
    const startups = db.prepare("SELECT * FROM startups").all();
    res.json(startups);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
