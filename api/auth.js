const users = new Map();

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.json({ success: true, working: true });

  // Handle body - try multiple ways
  let body = {};
  if (req.body) {
    if (typeof req.body === 'string') {
      try { body = JSON.parse(req.body); } catch (e) { }
    } else if (typeof req.body === 'object') {
      body = req.body;
    }
  } else if (req.method === 'POST') {
    // If no body parsed, try to read stream
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
      });
    });
  }

  const { name, email, password } = body;
  if (!email || !password) return res.status(400).json({ success: false, m: 'Email/pass' });

  if (name) {
    if (users.has(email)) return res.status(400).json({ success: false, m: 'Exists' });
    const id = 'u_' + Date.now();
    users.set(email, { id, name, email, password, role: 'organizer' });
    return res.status(201).json({ success: true, data: { user: { id, name, email, role: 'organizer' }, token: 't_' + id } });
  }

  const user = users.get(email);
  if (!user || user.password !== password) return res.status(401).json({ success: false, m: 'Bad' });
  return res.status(200).json({ success: true, data: { user: { id: user.id, name: user.name, email, role: 'organizer' }, token: 't_' + user.id } });
};
