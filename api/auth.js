const users = new Map();

const parseBody = async (req) => {
  return new Promise((resolve) => {
    if (req.body) {
      if (typeof req.body === 'string') {
        try { resolve(JSON.parse(req.body)); } catch (e) { resolve({}); }
      } else if (typeof req.body === 'object') {
        resolve(req.body);
      } else {
        resolve({});
      }
    } else {
      let data = '';
      req.on('data', chunk => { data += chunk; });
      req.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
      });
    }
  });
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pass) => pass && pass.length >= 6;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.json({ success: true, status: 'healthy' });
  if (req.method !== 'POST') return res.status(405).json({ success: false, m: 'Method not allowed' });

  const body = await parseBody(req);
  const { name, email, password } = body;

  if (!email || !validateEmail(email)) return res.status(400).json({ success: false, m: 'Invalid email' });
  if (!password || !validatePassword(password)) return res.status(400).json({ success: false, m: 'Password min 6 chars' });

  if (name) {
    if (typeof name !== 'string' || name.trim().length === 0) return res.status(400).json({ success: false, m: 'Invalid name' });
    if (users.has(email)) return res.status(409).json({ success: false, m: 'Email already exists' });
    const uid = `u_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    users.set(email, { id: uid, name: name.trim(), email, password, role: 'organizer', created: new Date().toISOString() });
    return res.status(201).json({
      success: true,
      data: {
        user: { id: uid, name: name.trim(), email, role: 'organizer' },
        token: `tk_${uid}`
      }
    });
  }

  const user = users.get(email);
  if (!user) return res.status(401).json({ success: false, m: 'User not found' });
  if (user.password !== password) return res.status(401).json({ success: false, m: 'Invalid password' });
  return res.status(200).json({
    success: true,
    data: {
      user: { id: user.id, name: user.name, email, role: user.role },
      token: `tk_${user.id}`
    }
  });
};
