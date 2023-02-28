let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/',indexController.displayHomePage);

/* GET home page. */
router.get('/home',indexController.displayHomePage);

/* GET About Me page. */
router.get('/about',indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects',indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services',indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact',indexController.displayContactMePage);


/* GET Route for displaying the login Page */
router.get('/login',indexController.displayLoginPage);

/*  POST Route for processing the login Page */
router.post('/login',indexController.processLoginPage);

/* GET Route for displaying the registration Page */
router.get('/register',indexController.displayRegisterPage);

/*  POST Route for processing the registration Page  */
router.post('/register',indexController.processRegisterPage);

/*  Get Route to perform user log out */
router.get('/logout',indexController.performLogout);

module.exports = router;
