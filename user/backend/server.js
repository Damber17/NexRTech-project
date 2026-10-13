// User backend entry point
const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'user backend ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`User backend running on port ${PORT}`));
