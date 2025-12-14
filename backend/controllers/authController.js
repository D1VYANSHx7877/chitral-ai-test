import { asyncHandler } from '../utils/asyncHandler.js';

// Temporary mock users storage (in-memory)
const mockUsers = new Map();

export const signup = asyncHandler(async (req, res) => {
  console.log('[AUTH] Signup request:', { email: req.body.email });
  const { name, email, password } = req.body;

  // Check if user already exists (in mock storage)
  if (mockUsers.has(email)) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists',
    });
  }

  // Create mock user
  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: 'organizer',
  };

  // Store in mock storage
  mockUsers.set(email, user);

  // Generate a mock token
  const token = 'mock_token_' + user.id;

  res.status(201).json({
    success: true,
    message: 'Organizer account created successfully',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  console.log('[AUTH] Login request:', { email: req.body.email });
  const { email, password } = req.body;

  // Find user in mock storage
  const user = mockUsers.get(email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Check role
  if (user.role !== 'organizer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Organizer role required.',
    });
  }

  const token = 'mock_token_' + user.id;
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: 'mock_id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'organizer',
      },
    },
  });
});
