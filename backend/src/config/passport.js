const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('./database');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const profilePic = profile.photos?.[0]?.value || null;
        const googleId = profile.id;

        // Upsert user — create if not exists, update if exists
        const user = await prisma.user.upsert({
          where: { googleId },
          update: {
            name,
            profilePic,
            email,
          },
          create: {
            email,
            name,
            profilePic,
            googleId,
            provider: 'GOOGLE',
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
