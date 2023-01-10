const verificarTalk = (req, res, next) => {
  const { talk } = req.body;
  const requiredProperties = ['watchedAt', 'rate'];

  if (!talk) {
    res.status(400).send({
      message: 'O campo "talk" é obrigatório',
    });
  } else {
    next();
  }
};

module.exports = verificarTalk;
