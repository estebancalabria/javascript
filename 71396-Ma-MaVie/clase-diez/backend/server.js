const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Para ver las variables de entorno
//console.log(process.env);

const PORT = process.env.PUERTO || 3000;

const app = express();
//miidleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`${new Date()} - ${req.method} ${req.path}`);
    next(); //llama al siguiente middleware
});

app.get('/', (req, res) => {
    let indexContent = require("fs").readFileSync("./views/index.html", "utf-8");
    res.send(indexContent);
});

app.get('/login', (req, res) => {
    let indexContent = require("fs").readFileSync("./views/login.html", "utf-8");
    res.send(indexContent);
});

app.post('/login', (req, res) => {
    console.log(req.body);
    console.log((req.body.username === "admin" && req.body.password === "admin"));
    if (req.body.username === "admin" && req.body.password === "admin") {
        res.cookie("usuario", "admin", { maxAge: 10000 * 60 * 60 * 24 });
        res.send("Usuario logueado");
    }else{
        //401 Unauthorized
        res.status(401, "Usuario o contraseña incorrectos");    
        res.send("Usuario o contraseña incorrectos");
    }
    //let indexContent = require("fs").readFileSync("./views/login.html", "utf-8");
    //res.send(indexContent);
});


app.get("/list-cookies", (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
});

app.get("/cookie-tercero", (req, res) => {
    res.cookie("cookie-tercero", "cookie de tercero", { maxAge: 10000 * 60 * 60 * 24 });
    //res.send("Cookie de tercero seteada");
    let ips = require("fs").readFileSync("./ip-visitadas.txt", "utf-8");
    ips += ips + req.ip + " " + req.hostname + "\n";
    require("fs").writeFileSync("./ip-visitadas.txt", ips);
    res.send("console.log('Cookie de tercero seteada');");
});

app.get("/set-cookies", (req, res) => {
    //La crea el servidor y la manda al cliente
    //Por lo general som creadas por el servidor
    //Es raro que se creen en el cliente como hicimos
    //En general las crea y las lee el servidor
    res.cookie("del-server", "datos seteado del server", { maxAge: 10000 * 60 * 60 * 24 });
    res.cookie("otra-del-server", "datos seteado del server", { maxAge: 10000 * 60 * 60 * 24 });
    res.cookie("ip-cliente", req.ip , { maxAge: 10000 * 60 * 60 * 24 });
    res.send("Cookie seteada");
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});