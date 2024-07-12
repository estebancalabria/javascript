const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const usuarios = [];

const CLAVE_SECRETA_APP = "dshjfshfjsdhfkjdshfjshfdk";

const json_usuarios = require('fs').readFileSync('usuarios.json', 'utf-8');
usuarios.push(...JSON.parse(json_usuarios));
console.log(usuarios);

app.use(express.static('public')); // Para servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5555;

//Como el liveshaare
app.get('/', (req, res) => {
    console.log('Petición GET a /');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/protected', authMiddleware, (req, res) => {
    console.log('Petición GET a /protected');
    res.sendFile(__dirname + '/public/protected.html');
});

//A partir de aca es backend propiamente dicho

function authMiddleware(req, res, next) {
    console.log('Petición a ruta protegida');
    const token = req.cookies.token;
    if (!token) {
        console.log('No hay token');
        return res.sendStatus(401);
    }

    jwt.verify(token, CLAVE_SECRETA_APP, (err, decoded) => {
        if (err) {
            console.log('Token inválido');
            return res.sendStatus(403);
        }
        next();
    });
}



app.post('/login', (req, res) => {
    console.log('Petición POST a /login');

    const { username, password } = req.body;
    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    try {
        bcrypt.compare(password, usuario.hash, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensaje: 'Error al comparar contraseñas' });
            }

            if (result) {

                console.log('Usuario autenticado');

                const token = jwt.sign({ username }, CLAVE_SECRETA_APP, { expiresIn: '1h' });
                //res.cookie('token', token, { httpOnly: true });
                res.cookie('token', token);

                return res.status(200).json({ 
                    mensaje: 'Usuario autenticado' ,
                    redireccion : '/protected'
                });

            } else {
                console.log('Contraseña incorrecta');
                return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al comparar contraseñas' });
    }
});

app.get('/logout', (req, res) => {
    console.log('Petición GET a /logout');
    res.clearCookie('token');
    
    //Redirigir a la página de inicio
    res.redirect('/');
});

app.post('/registro', (req, res) => {
    console.log('Petición POST a /registro');
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log('Contraseña encriptada: ', hash);
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al crear el usuario' });
        }

        try {
            const { username } = req.body;
            const usuario = {
                id: Math.max(...usuarios.map(u => u.id), 0) + 1,
                username,
                hash
            };
            usuarios.push(usuario);
            require('fs').writeFileSync('usuarios.json', JSON.stringify(usuarios));
            console.log("Usuario Registrado: ", usuario.username);
            res.status(201).json({ mensaje: 'Usuario creado correctamente' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al crear el usuario' });
        }
    });

});

function authMiddlewareWithHeaders(req, res, next) {
    console.log('Petición a ruta protegida con headers');
    const token = req.headers['authorization'];
    if (!token) {
        console.log('No hay token');
        res.send({ mensaje: 'No hay token' })
        return res.sendStatus(401);
    }

    jwt.verify(token, CLAVE_SECRETA_APP, (err, decoded) => {
        if (err) {
            console.log('Token inválido');
            res.send({ mensaje: 'Token inválido' })
            return res.sendStatus(403)
        }

        next();
    });

}


app.get('/api/datos', authMiddlewareWithHeaders, (req, res) => {
    console.log('Petición GET a /api/datos');
    res.json({ mensaje: 'Estos son los datos' });
});

app.listen(port, () => {
    console.log(`Server escuchando en el puerto ${port}`);
});

