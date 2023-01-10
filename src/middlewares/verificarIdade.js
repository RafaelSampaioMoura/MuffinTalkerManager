const verificarIdade = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  } else if (age < 18) {
    res.status(400).send({
      message: "A pessoa palestrante deve ser maior de idade",
    });
  } else {
    next();
  }
};

module.exports = verificarIdade;
