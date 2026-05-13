
//npm install express mongoose ejs express-validator method-override
// mkdir -p src/config src/controllers src/middlewares src/models src/repositories src/routes src/services src/validations src/views/partials src/public/css

// Importación de módulos principales
import express from 'express';                     // Framework para el servidor
import path from 'path';                           // Para trabajar con rutas de archivos
import { fileURLToPath } from 'url';               // Necesario para usar __dirname en ES Modules
import methodOverride from 'method-override';      // Permite que formularios HTML usen PUT y DELETE

import { connectDB } from './config/dbConfig.mjs';


//import superheroesRoutes from './routes/superheroesRoutes.mjs';  // 
import superHeroRoutesDatos from './routes/superHeroesRoutesDatos.mjs';  // backend (JSON)
import heroFrontRoutesVistas from './routes/superHeroesRoutesVistas.mjs';  // VISTAS front

import expressLayouts from 'express-ejs-layouts';  // utilizando layout


const app = express();
const PORT = 3005;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares básicos
app.use(express.json()); // transforma el cuerpo (body) de las peticiones jason en objetos js disponibles en req.body
app.use(express.urlencoded({ extended: true }));//Transforma los datos que vienen desde formularios HTML (formato nombre=Juan&edad=30) a un objeto JavaScript en req.body.
app.use(methodOverride('_method'));  // NUEVO (para PUT y DELETE), engaña a espress, _method=PUT es para express un PUT REAL
app.use(express.static(path.join(__dirname, 'public')));//El navegador pide /css/style.css Y Express busca public/css/style.css y lo envía.



// EJS motor de las vitas 
app.set('view engine', 'ejs');//se define que voy a usar ejs
app.set('views', path.join(__dirname, 'views'));//donde estan las vistas 


// express-ejs-layouts
app.use(expressLayouts);           // Activa el middleware
app.set('layout', 'layout');       // Nombre del archivo layout (sin .ejs)

// Conexión a DB
await connectDB();

// Rutas
app.use('/api/heroes', superHeroRoutesDatos);
app.use('/dashboard', heroFrontRoutesVistas);

console.log('Rutas de héroes montadas en /api/heroes');

// Ruta principal
// app.get('/', (req, res) => {
//     res.redirect('/dashboard');
// });
//si el navegador peticiona localhost:3005/ se redirige a localhost:3005/dashboard 


// Ruta principal (landing)
app.get('/', (req, res) => {
    res.render('landing', {
        titulo: 'Inicio - SuperApp'
    });
});



// Ruta de prueba
// app.get('/', (req, res) => {
//     res.send('🚀 Servidor funcionando correctamente');// respuesta en el navegador 
// });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`); // respuesta en la consola
});
//Flujo: El servidor arranca , conecta a MongoDB , queda a la espera de que alguien visite http://localhost:3005/dashboard 