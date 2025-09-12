const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connecté à MongoDB Atlas');
  server.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
  });
})
.catch(err => {
  console.error('Erreur de connexion MongoDB :', err);
  process.exit(1);
});

server.on('error', error => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' nécessite des privilèges élevés.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' est déjà utilisé.');
      process.exit(1);
    default:
      throw error;
  }
});