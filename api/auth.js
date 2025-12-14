const users = new Map();

const parseRequestBody = async (req) => {
  return new Promise((resolve) => {
    let rawBody = '';
    req.on('data', chunk => { rawBody += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(rawBody));
      } catch (e) {
        console.log('[Parse Error]', rawBody);
        resolve({});
      }
    });
  });
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.json({ success: true, ready: true });

  const body = await parseRequestBody(req);
  const { name, email, password } = body;

  if (!email || !password) return res.status(400).json({ success: false, message: 'Email/password required' });

  if (name) {
    if (users.has(email)) return res.status(400).json({ success: false, message: 'Email exists' });
    const uid = 'u' + Date.now();
    users.set(email, { id: uid, name, email, password, role: 'organizer' });
    return res.status(201).json({ success: true, data: { user: { id: uid, name, email, role: 'organizer' }, token: 'tk_' + uid } });
  }

  const user = users.get(email);
  if (!user || user.password !== password) return res.status(401).json({ success: false, message: 'Invalid' });
  return res.json({ success: true, data: { user: { id: user.id, name: user.name, email, role: 'organizer' }, token: 'tk_' + user.id } });
};
