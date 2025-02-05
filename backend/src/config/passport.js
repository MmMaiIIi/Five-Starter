//backend/src/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/users');
const { generateToken} = require('../utils/jwt');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('Google Access Token:', accessToken);  // 查看是否成功获取了 access token
    console.log('Google Refresh Token:', refreshToken); // 查看是否成功获取了 refresh token
    console.log('Google Profile:', profile);  // 查看 Google 用户信息
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                googleId: profile.id,
            });
        }

        const token = generateToken(user);
        return done(null, {user, token});
    } catch (error) {
        return done(error, false);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('GitHub Access Token:', accessToken);  // 查看是否成功获取了 access token
    console.log('GitHub Refresh Token:', refreshToken); // 查看是否成功获取了 refresh token
    console.log('GitHub Profile:', profile);  // 查看 GitHub 用户信息
    try {
        let user = await User.findOne({ username: profile.username });

        if (!user) {
            user = await User.create({
                username: profile.username,
                githubId: profile.id,
            });
        }

        const token = generateToken(user);
        return done(null, {user, token});
    } catch (error) {
        return done(error, false);
    }        
}));

module.exports = passport;
