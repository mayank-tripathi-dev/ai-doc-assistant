require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured (set GOOGLE_CLIENT_ID)'}`);
});