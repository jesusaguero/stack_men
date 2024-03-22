import express from 'express';

import { engine } from 'express-handlebars';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from "url";

import clientesRoutes from './routes/clientes.routes.js';
//inicializar
const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));

//configuraciones
app.set('port',process.env.PORT || 3000);
//Carpeta vistas
app.set('views', join (__dirname,'views'));

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir:join(app.get('views'), 'layouts'),
    partialsDir:join(app.get('views'), 'partials'),
    extname:'hbs'
}));
app.set('view engine', 'hbs');

//Middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json())


app.get('/',(req,res)=>{
    res.render('index')
})
app.use(clientesRoutes)
app.use(express.static(join(__dirname, 'public')))

//ejecutar al servidor
app.listen(app.get('port'),()=>{
    console.log("cargando el puerto",app.get('port'))
})