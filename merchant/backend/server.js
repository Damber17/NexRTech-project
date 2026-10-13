// Merchant backend entry point
const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'merchant backend ok' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Merchant backend running on port ${PORT}`));
