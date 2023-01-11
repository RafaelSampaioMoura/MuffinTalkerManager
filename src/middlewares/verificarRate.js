// const verificarRate = (req, res, next) => {
//   const { rate } = req.body.talk;
//   const existe = !rate || rate === null;
//   const limites = rate < 1 || rate > 5 || rate % 1 !== 0;

//   if (rate === 0) {
//     res.status(400).send({
//       message: 'O campo "rate" deve ser um inteiro de 1 à 5',
//     });
//   } else if (existe) {
//     res.status(400).send({
//       message: 'O campo "rate" é obrigatório',
//     });
//   } else if (limites) {
//     res.status(400).send({
//       message: 'O campo "rate" deve ser um inteiro de 1 à 5',
//     });
//   } else {
//     next();
//   }
// };

const verificarRateSeZero = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === 0) {
    res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } else {
    next();
  }
};
const verificarRateExiste = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate) {
    res.status(400).send({
      message: 'O campo "rate" é obrigatório',
    });
  } else {
    next();
  }
};
const verificarRateNoLimite = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate < 1 || rate > 5 || rate % 1 !== 0) {
    res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } else {
    next();
  }
};

module.exports = {
  verificarRateSeZero,
  verificarRateExiste,
  verificarRateNoLimite,
};
