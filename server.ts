import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

// Ensure the data directory and messages.json exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), "utf8");
}

app.use(express.json());

// Helper to read messages
const readMessages = () => {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
};

// Helper to write messages
const writeMessages = (messages: any[]) => {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing messages:", error);
    return false;
  }
};

// Simple auth middleware using a secret token/password
const AUTH_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_TOKEN = "portfolio_admin_token_2026"; // Simple static token for demo security

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
};

// API Routes

// 1. Submit contact message
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const messages = readMessages();
  const newMessage = {
    id: Math.random().toString(36).substring(2, 11),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
    status: "unread", // unread, read
  };

  messages.unshift(newMessage); // Newest messages first
  const success = writeMessages(messages);

  if (success) {
    res.status(201).json({ success: true, message: "Inquiry received successfully!" });
  } else {
    res.status(500).json({ error: "Failed to store message" });
  }
});

// 2. Admin Login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  if (password === AUTH_PASSWORD) {
    return res.json({ success: true, token: AUTH_TOKEN });
  } else {
    return res.status(401).json({ error: "Incorrect password" });
  }
});

// 3. Get all contact messages (Admin only)
app.get("/api/admin/messages", authenticate, (req, res) => {
  const messages = readMessages();
  res.json({ success: true, messages });
});

// 4. Update message status (Admin only)
app.patch("/api/admin/messages/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["read", "unread"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const messages = readMessages();
  const index = messages.findIndex((m: any) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  messages[index].status = status;
  writeMessages(messages);

  res.json({ success: true, message: messages[index] });
});

// 5. Delete a message (Admin only)
app.delete("/api/admin/messages/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const messages = readMessages();
  const filteredMessages = messages.filter((m: any) => m.id !== id);

  if (messages.length === filteredMessages.length) {
    return res.status(404).json({ error: "Message not found" });
  }

  writeMessages(filteredMessages);
  res.json({ success: true, message: "Inquiry deleted successfully" });
});

// Setup Vite development middleware or serve production static assets
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
