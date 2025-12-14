const users = new Map();

module.exports = (req, res) => {
  console.log('[API]', { method: req.method, body: req.body });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.json({ success: true, ready: true, users: users.size });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const { name, email, password } = body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing email/password' });

  if (name) {
    if (users.has(email)) return res.status(400).json({ success: false, message: 'Email exists' });
    const user = { id: 'u' + Date.now(), name, email, password, role: 'organizer' };
    users.set(email, user);
    return res.status(201).json({ success: true, message: 'Created', data: { user: { id: user.id, name, email, role: 'organizer' }, token: 'token_' + user.id } });
  }

  const user = users.get(email);
  if (!user || user.password !== password) return res.status(401).json({ success: false, message: 'Invalid' });
  return res.status(200).json({ success: true, message: 'OK', data: { user: { id: user.id, name: user.name, email, role: 'organizer' }, token: 'token_' + user.id } });
};
