const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const path = '/talker.json';

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', async (_request, _response) => {
  console.log('Servidor ouvindo porta 3000');
});

app.get('/talker', async (_req, res) => {
  const completePath = join(__dirname, path);
  const data = await fs.readFile(completePath);
  if (data.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  } 
    const allTalkers = JSON.parse(data);
    res.status(HTTP_OK_STATUS).send(allTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
