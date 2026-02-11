const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js server!' });
});

let clients = [];
let messages = [];

// SSE endpoint
router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  // Initial event
  res.write(`event: init\ndata: ${JSON.stringify(messages)}\n\n`);

  const client = { id: Date.now(), res };
  clients.push(client);

  req.on("close", () => {
    clients = clients.filter(c => c.id !== client.id);
  });
});

// API → triggers event
router.post("/add", express.json(), (req, res) => {
  const { text } = req.body;
  const newMsg = { id: Date.now(), text };
  messages.push(newMsg);

  // Push event to all SSE clients (with event name)
  clients.forEach(c =>
    c.res.write(`event: message\ndata: ${JSON.stringify(newMsg)}\n\n`)
  );

  res.json({ success: true });
});

module.exports = router;
