const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const User = require('../schemas/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (user) done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CLIENT_REDIRECT,
    scope: ['identify', 'email', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({id: profile.id});
        if (user) {
            user.token = accessToken;
            const savedUser = user.save();
            done(null, savedUser);
        } else {
            const newUser = await User.create({ discordId: profile.id, userName: profile.username, email: profile.email, token: accessToken});
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch(error) {
        console.log(error);
        done(error, null);
    }
}));

