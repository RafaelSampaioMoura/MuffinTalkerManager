const express = require("express");
const fs = require("fs").promises;
const { join } = require("path");
const tokenGenerator = require("crypto");

const path = "/talker.json";

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = "3000";

const verificarEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!email) {
    res.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!email.match(regex)) {
    res.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } else {
    next();
  }
};

const verificarSenha = (req, res, next) => {
  const { password } = req.body;
  const regex = 6;

  if (!password) {
    res.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "password" é obrigatório',
    });
  } else if (password.length < regex) {
    res.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  } else {
    next();
  }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get("/talker/:id", async (req, res) => {
  const completePath = join(__dirname, path);
  const data = await fs.readFile(completePath);
  const talkers = JSON.parse(data);
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) {
    res.status(HTTP_NOT_FOUND_STATUS).send({
      message: "Pessoa palestrante não encontrada",
    });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get("/", async (_request, _response) => {
  console.log("Servidor ouvindo porta 3000");
});

app.get("/talker", async (_req, res) => {
  const completePath = join(__dirname, path);
  const data = await fs.readFile(completePath);
  if (data.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  const allTalkers = JSON.parse(data);
  res.status(HTTP_OK_STATUS).send(allTalkers);
});

app.post("/login", verificarEmail, verificarSenha, async (__req, res) => {
  const rndToken = tokenGenerator.randomBytes(8).toString("hex");
  res.status(HTTP_OK_STATUS).send({
    token: rndToken,
  });
});

app.listen(PORT, () => {
  console.log("Online");
});
