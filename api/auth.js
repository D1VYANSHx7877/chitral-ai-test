// In-memory user storage
const users = new Map();

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Parse body
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  
  // Signup
  if (req.method === 'POST') {
    const { name, email, password } = body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    if (users.has(email)) {
      return res.status(400).json({ success: false, message: 'User exists' });
    }
    const user = { id: Date.now().toString(), name, email, password, role: 'organizer' };
    users.set(email, user);
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: { user: { id: user.id, name, email, role: 'organizer' }, token: 'token_' + user.id }
    });
  }
  
  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, message: 'API running' });
  }
  
  res.status(404).json({ success: false });
}
