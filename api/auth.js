// Simple in-memory user storage
const users = new Map();

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, message: 'Auth API is running' });
  }
  
  // Signup endpoint
  if (req.method === 'POST' && req.url === '/api/auth/signup') {
    const { name, email, password } = req.body || {};
    
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    if (users.has(email)) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const user = { id: Date.now().toString(), name, email, password, role: 'organizer' };
    users.set(email, user);
    const token = 'mock_token_' + user.id;
    
    return res.status(201).json({
      success: true,
      message: 'Organizer account created successfully',
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
    });
  }
  
  // Login endpoint
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    const { email, password } = req.body || {};
    const user = users.get(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = 'mock_token_' + user.id;
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
    });
  }
  
  res.status(404).json({ success: false, message: 'Not found' });
}
