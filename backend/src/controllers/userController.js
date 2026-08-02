const prisma = require('../config/database');

async function getProfile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        profilePic: true,
        provider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
}

async function updateProfile(req, res) {
  try {
    const { name, profilePic } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(profilePic !== undefined && { profilePic }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        profilePic: true,
        provider: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
