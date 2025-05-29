const express = require('express');
const cors = require('cors');  // <-- importa cors aquí
const app = express();

app.use(cors()); // <-- habilita CORS para todas las rutas

const port = 5000;

app.get('/api/tu-endpoint', (req, res) => {
  res.json({ message: 'API backend funcionando' });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en puerto ${port}`);
});