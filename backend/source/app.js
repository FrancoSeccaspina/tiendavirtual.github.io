const express = require('express');
const path = require('path');
const { port, start } = require('./modules/server');
const static = require('./modules/static');
const { join } = require('path');
const cors = require('cors');

const method = require('method-override');

const session = require('express-session');
const cookie = require('cookie-parser');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(static(publicPath))

app.set('views', join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(port, start());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: 'clave', resave: true, saveUninitialized: true }));
app.use(cookie())

app.use(method('m'));

app.use(require('./middlewares/user'));
app.use(require('./routes/products.routes'));
app.use(require('./routes/users.routes'));

app.use(cors());

app.use(require('./routes/api/products.api.routes'));
app.use(require('./routes/api/users.api.routes'));
app.use(require('./routes/api/categories.api.routes'));

app.get("/login", function(req,res) {
    return res.render("login");
});

app.get("/carrito", function(req,res) {
    return res.render("carrito");
});

app.get('/paginaEnConstruccion', function(req,res) {
    return res.render("paginaEnConstruccion");
});

app.get("/profile", function(req,res) {
    return res.render("profile");
});

app.use((req, res, next) => {
    res.status(404).render('404')
});