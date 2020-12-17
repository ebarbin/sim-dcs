const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const User = require('../schemas/User');
const Pilot = require('../schemas/Pilot');

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
        const user = await User.findOne({discordId: profile.id});
        if (user) {
            user.token = accessToken;
            const savedUser = await user.save();

            const pilot = await Pilot.findOne({userName: profile.username});
            if (pilot) {
                if (!pilot.user) {
                    pilot.user = user;
                    await pilot.save();
                }
            } else {
                const newPilot = await Pilot.create({userName: profile.username, userId: user});
                await newPilot.save();
            }

            done(null, savedUser);
        } else {

            const newUser = await User.create({ discordId: profile.id, userName: profile.username, email: profile.email, token: accessToken});
            const savedUser = await newUser.save();

            //Check pilot
            const pilot = await Pilot.findOne({userName: profile.username});
            if (pilot) {

                if (!pilot.user) {
                    pilot.user = savedUser;
                    await pilot.save();
                }

            } else {
                const newPilot = await Pilot.create({userName: profile.username, userId: savedUser});
                await newPilot.save();
            }

            done(null, savedUser);
        }
    } catch(error) {
        console.log(error);
        done(error, null);
    }
}));

