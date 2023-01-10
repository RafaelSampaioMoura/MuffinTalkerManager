const verificarEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!email) {
    res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!email.match(regex)) {
    res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } else {
    next();
  }
};

module.exports = verificarEmail;
