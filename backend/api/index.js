// Vercel serverless function entry point
import app from '../server.js';

// Export as Vercel serverless function handler
export default async (req, res) => {
  return app(req, res);
};

