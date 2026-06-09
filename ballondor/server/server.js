import express from 'express';
import router from './routes/router.js';
import failurePage from './failurePage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize express app
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

// fallback route for any URL that does not match the app's defined routes
app.use(failurePage);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
