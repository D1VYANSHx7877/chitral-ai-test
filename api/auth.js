const users = new Map();

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
     const body = JSON.parse(typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}));
    
    // POST = signup or login
    if (req.method === 'POST') {
      const { name, email, password } = body;
      
      // No email or password = error
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
      }
      
      // If name exists = signup, else = login
      if (name) {
        // SIGNUP
        if (users.has(email)) {
          return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        const user = { id: Date.now().toString(), name, email, password, role: 'organizer' };
        users.set(email, user);
        return res.status(201).json({
          success: true,
          message: 'Account created successfully',
          data: {
            user: { id: user.id, name, email, role: 'organizer' },
            token: 'mock_token_' + user.id
          }
        });
      } else {
        // LOGIN
        const user = users.get(email);
        if (!user || user.password !== password) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: {
            user: { id: user.id, name: user.name, email, role: 'organizer' },
            token: 'mock_token_' + user.id
          }
        });
      }
    }
    
    // GET = health check
    if (req.method === 'GET') {
      return res.status(200).json({ success: true, message: 'API ready', users: users.size });
    }
    
    res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Server error: ' + err.message });
  }
}
