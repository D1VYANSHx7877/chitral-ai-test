const users = new Map();

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let body;
  try {
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (typeof req.body === 'object') {
      body = req.body || {};
    } else {
      body = {};
    }
  } catch (e) {
    body = {};
  }

  const { name, email, password } = body;

  if (req.method === 'POST') {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    if (name) {
      // SIGNUP
      if (users.has(email)) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
      users.set(email, { id: Date.now().toString(), name, email, password, role: 'organizer' });
      return res.status(201).json({
        success: true,
        message: 'Account created',
        data: {
          user: { id: Date.now().toString(), name, email, role: 'organizer' },
          token: 'token_' + Date.now()
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
          token: 'token_' + user.id
        }
      });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, message: 'Auth ready', users: users.size });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
};
