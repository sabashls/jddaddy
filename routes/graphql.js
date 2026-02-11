const express = require('express');
const router = express.Router();

// GraphQL →  API endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GraphQL endpoint!' });
});

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