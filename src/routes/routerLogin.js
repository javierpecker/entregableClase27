import { isLoggedIn } from '../middlewares/auth';
import express from 'express';
import passport from '../middlewares/auth';




const app = express();


const routerLogin = express.Router();


routerLogin.get('/login', (req, res) => {
	res.render('login');
});

routerLogin.get(
	'/auth/facebook',
	passport.authenticate('facebook', { scope: ['email'] })
);

routerLogin.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', {
	  successRedirect: '/datos',
	  failureRedirect: '/fail',
	})
);

routerLogin.get('/fail', (req, res) => {
	res.render('login-error', {});
});
  
routerLogin.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

routerLogin.get('/datos', (req, res) => {
	let foto = 'noPhoto';
	let email = 'noEmail';
  
	if (req.isAuthenticated()) {
	  const userData = req.user;
	  
	  if (!userData.contador) userData.contador = 0;
	  userData.contador++;
  
	  if (userData.photos) foto = userData.photos[0].value;
  
	  if (userData.emails) email = userData.emails[0].value;
  
	  res.render('datos', {
		nombre: userData.displayName,
		contador: userData.contador,
		foto,
		email,
	  });
	} else {
	  res.redirect('/login');
	}
  });


export default routerLogin;