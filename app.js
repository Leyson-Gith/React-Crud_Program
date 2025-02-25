const express = require('express');            // Requerimos el módulo de Express para crear la aplicación
const app = express();                       // con esta configuración invocamos a express 


app.set('view engine', 'ejs');      // Configuramos EJS como el motor de plantillas, que genera vistas HTML dinámicas
app.use(express.urlencoded({extended:false}));  // Middleware para parsear datos de formularios (formulario URL-encoded)
app.use(express.json());                       // Middleware para parsear datos en formato JSON

app.use('/', require('./router'));   // Definimos el enrutador principal para manejar todas las rutas que comienzan con '/'
app.get('/buscar', (req, res) => {
     const query = req.query.query; // Obtiene el término de búsqueda
     // Lógica para buscar en la base de datos usando el término 'query'
     // Por ejemplo, si estás buscando usuarios en una base de datos:
     User.find({ name: { $regex: query, $options: 'i' } }, (err, results) => {
         if (err) {
             return res.status(500).send('Error en la búsqueda');
         }
         res.render('resultadoBusqueda', { results }); // Renderiza la vista con los resultados
     });
 });




app.listen(5000, '0.0.0.0', () => {     // Configuramos el servidor para escuchar en el puerto 5000 y aceptar conexiones desde cualquier IP (0.0.0.0)
     console.log('SERVER CORRIENDO EN http://localhost:5000');    // Asi con  esta configuración el puerto corre 
                                                                  // en cualquier navegador
   });