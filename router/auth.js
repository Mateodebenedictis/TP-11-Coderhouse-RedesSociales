const { Router } = require('express')
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/register', async function(req, res) {
    await createUser(req, res);

    //si el resgistro es correcto(res.status(201)), guardo el username en la session
    if(res.status(201)){
        req.session.username = req.body.username;
    }
});

router.post('/login', async function(req, res) {

    await loginUser(req, res);

    //si el login es correcto(res.status(200)), guardo el username en la session
    if(res.status(200)){
        req.session.username = req.body.username;
    }
});

router.post('/logout', (req, res) => {

    //elimino la session
    req.session.destroy((err) => {
        if (!err) {res.status(200).json({msg: 'Logout OK'});}
        else {res.status(500).json({msg: 'Logout ERROR'});}
    });
});       

router.get('/renew', validateJWT, renewToken);


module.exports = router;