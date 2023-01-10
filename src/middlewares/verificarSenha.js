const verificarSenha = (req, res, next) => {
  const { password } = req.body;
  const regex = 6;

  if (!password) {
    res.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  } else if (password.length < regex) {
    res.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  } else {
    next();
  }
};

module.exports = verificarSenha;
