const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { ensureAuthenticated } = require('connect-ensure-authenticated');

// Configure the local strategy for use by Passport.
//
// The local strategy requires a `verify` function which receives the
// credentials (`username` and `password`) submitted by the user.  The function
// must verify that the password is correct and then invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new LocalStrategy(
    async function verify(username, password, cb) {
      // fake authentication here
      const user = {
        username,
      };
      
      if (user) {
        // successful login
        return cb(null, user);
      } else {
        // failed login
        return cb(null, false);
      }
    }
  )
);


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

// Create a new Express application.
const app = express();
app.enable('trust proxy');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

const loginHtml = `
  <form action="/login" method="POST">
    <label style="display: block">
      User name<br/>
      <input type="text" name="username"/>
    </label>
    <label style="display: block">
      Password<br/>
      <input type="password" name="password"/>
    </label>
    <button type="submit">Log in</button>
  </form>
`;

app.route('/login')
  .get((req, res) => {
    res.send(loginHtml);
  })
  .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(loginHtml);
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        return res.redirect('/home');
      });
    })(req, res, next);
  });

app.route('/home')
  .get(
    ensureAuthenticated(),
    (req, res) => res.send(`
      Home<br/>username = ${req.user.username}
      <a href="/logout">Log out</a>
    `)
  );

app.route('/login/failed')
  .get((req, res) => {
    res.send('error!');
  });

app.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports.apiServer = app;

if (require.main === module) {
  // FIXME: static serving for dist folder
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
