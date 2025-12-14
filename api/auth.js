const users = new Map();

// Parse JSON body safely
function parseBody(req) {
  try {
    if (!req.body) return {};
    
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }
    
    if (typeof req.body === 'object') {
      return req.body;
    }
    
    return {};
  } catch (err) {
    console.error('[Auth] Body parse error:', err);
    return {};
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = parseBody(req);
    const { name, email, password } = body;

    // POST = signup or login
    if (req.method === 'POST') {
      // Validate required fields
      if (!email || !password) {
        console.log('[Auth] Missing credentials:', { email: !!email, password: !!password });
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      // SIGNUP (has name)
      if (name) {
        console.log('[Auth] Signup request:', { email, name });
        
        // Check if user exists
        if (users.has(email)) {
          return res.status(400).json({
            success: false,
            message: 'Email already registered',
          });
        }

        // Create user
        const userId = `user_${Date.now()}`;
        const user = {
          id: userId,
          name,
          email,
          password,
          role: 'organizer',
        };

        users.set(email, user);
        console.log('[Auth] User created:', { userId, email });

        return res.status(201).json({
          success: true,
          message: 'Account created successfully',
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token: `token_${userId}`,
          },
        });
      }
      
      // LOGIN (no name)
      else {
        console.log('[Auth] Login request:', { email });
        
        const user = users.get(email);
        
        if (!user || user.password !== password) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
          });
        }

        console.log('[Auth] Login successful:', { email });

        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token: `token_${user.id}`,
          },
        });
      }
    }

    // GET = health check
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        message: 'Auth API ready',
        users: users.size,
      });
    }

    // Unsupported method
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  } catch (err) {
    console.error('[Auth] Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error: ' + (err.message || 'Unknown error'),
    });
  }
}
