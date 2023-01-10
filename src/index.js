const express = require('express');

const rotas = require('./routes/talkerRotas');

const app = express();
app.use(express.json());
app.use(rotas);

// const HTTP_OK_STATUS = 200;
// const HTTP_BAD_REQUEST_STATUS = 400;
// const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', async (_request, _response) => {
  console.log('Servidor ouvindo porta 3000');
});

app.listen(PORT, () => {
  console.log('Online');
});
