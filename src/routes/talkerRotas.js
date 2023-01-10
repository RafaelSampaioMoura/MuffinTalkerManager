const express = require('express');
const tokenGenerator = require('crypto');
const { readFile, writeFile } = require('../utils/FileSync');
const verificarEmail = require('../middlewares/verificarEmail');
const verificarIdade = require('../middlewares/verificarIdade');
const verificarNome = require('../middlewares/verificarNome');
const verificarRate = require('../middlewares/verificarRate');
const verificarSenha = require('../middlewares/verificarSenha');
const verificarTalk = require('../middlewares/verificarTalk');
const verificarToken = require('../middlewares/verificarToken');
const verificarWatchedAt = require('../middlewares/verificarWatchedAt');

const roteador = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
roteador.put(
  '/talker/:id',
  verificarToken,
  verificarNome,
  verificarIdade,
  verificarTalk,
  verificarWatchedAt,
  verificarRate,
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
  verificarWatchedAt,
  verificarRate,
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

module.exports = roteador;
