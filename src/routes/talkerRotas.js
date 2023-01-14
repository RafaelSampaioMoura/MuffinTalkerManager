const express = require('express');
const tokenGenerator = require('crypto');
const { readFile, writeFile } = require('../utils/FileSync');
const verificarEmail = require('../middlewares/verificarEmail');
const verificarIdade = require('../middlewares/verificarIdade');
const verificarNome = require('../middlewares/verificarNome');
const {
  verificarRateSeZero,
  verificarRateExiste,
  verificarRateNoLimite,
} = require('../middlewares/verificarRate');
const verificarSenha = require('../middlewares/verificarSenha');
const verificarTalk = require('../middlewares/verificarTalk');
const verificarToken = require('../middlewares/verificarToken');
const {
  verificarWatchedAtExiste,
  verificarWatchedAtFormato,
} = require('../middlewares/verificarWatchedAt');

const roteador = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

roteador.get('/talker/search', verificarToken, async (req, res) => {
  const { q } = req.query;
  const data = await readFile();

  const searchResults = data.filter(({ name }) => name.includes(q));

  if (!q) {
    res.status(200).json(data);
  } else if (searchResults.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).json(searchResults);
  }
});

roteador.put(
  '/talker/:id',
  verificarToken,
  verificarNome,
  verificarIdade,
  verificarTalk,
  verificarWatchedAtExiste,
  verificarWatchedAtFormato,
  verificarRateSeZero,
  verificarRateExiste,
  verificarRateNoLimite,
  async (req, res) => {
    const talkers = await readFile();
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    const { id } = talker;
    const novoPalestrante = { id, ...req.body };
    talkers[id - 1] = novoPalestrante;
    await writeFile(JSON.stringify(talkers, null, 2));
    res.status(200).json(novoPalestrante);
  },
);

roteador.post('/login', verificarEmail, verificarSenha, async (__req, res) => {
  const rndToken = tokenGenerator.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).send({
    token: `${rndToken}`,
  });
});

roteador.post(
  '/talker',
  verificarToken,
  verificarNome,
  verificarIdade,
  verificarTalk,
  verificarWatchedAtExiste,
  verificarWatchedAtFormato,
  verificarRateExiste,
  verificarRateSeZero,
  verificarRateNoLimite,
  async (req, res) => {
    const data = await readFile();
    const novoPalestrante = { id: data.length + 1, ...req.body };
    data.push(novoPalestrante);
    await writeFile(JSON.stringify(data, null, 2));
    res.status(201).json(novoPalestrante);
  },
);

roteador.get('/talker', async (_req, res) => {
  const data = await readFile();
  if (data.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  res.status(HTTP_OK_STATUS).json(data);
});

roteador.get('/talker/:id', async (req, res) => {
  const talkers = await readFile();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) {
    res.status(HTTP_NOT_FOUND_STATUS).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

roteador.delete('/talker/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const data = await readFile();
  const toDelete = data.find((talker) => talker.id === Number(id));
  if (!toDelete) {
    res
      .status(404)
      .json({ message: 'Nenhum palestrante com esse ID encontrato.' });
  }
  data.splice(data.indexOf(toDelete), 1);
  await writeFile(JSON.stringify(data, null, 2));
  res.status(204).send();
});

module.exports = roteador;
