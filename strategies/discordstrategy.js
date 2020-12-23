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
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, async (accessToken, refreshToken, profile, done) => {

    try {
        const user = await User.findOne({discordId: profile.id});
        if (user) {
            user.token = accessToken;
            user.avatar = 'https://cdn.discordapp.com/avatars/' + profile.id + '/' + profile.avatar + '.jpg';
            if (!user.pilot) {           
                let pilot = await Pilot.findOne({ userName: profile.username });

                if (!pilot) {
                    pilot = await Pilot.create({userName: profile.username, flightEvents: [], currentFlightEvents: [] });
                    await pilot.save();
                }

                user.pilot = pilot;
            }

            const savedUser = await user.save();

            done(null, savedUser);
        } else {

            let pilot = await Pilot.findOne({userName: profile.username});
            if (!pilot) {
                pilot = await Pilot.create({userName: profile.username, flightEvents: [], currentFlightEvents: []});
                await pilot.save();
            }

            const newUser = await User.create({ 
                discordId: profile.id, 
                userName: profile.username, 
                email: profile.email, 
                avatar: 'https://cdn.discordapp.com/avatars/' + profile.id + '/' + profile.avatar + '.jpg',
                token: accessToken, 
                pilot: pilot
            });

            const savedUser = await newUser.save();

            done(null, savedUser);
        }
    } catch(error) {
        console.log(error);
        done(error, null);
    }
}));

