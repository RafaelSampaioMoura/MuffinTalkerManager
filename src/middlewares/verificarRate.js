const verificarRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === 0) {
    res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } else if (!rate || rate === null) {
    res.status(400).send({
      message: 'O campo "rate" é obrigatório',
    });
  } else if (rate < 1 || rate > 5 || rate % 1 !== 0) {
    res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } else {
    next();
  }
};

module.exports = verificarRate;
