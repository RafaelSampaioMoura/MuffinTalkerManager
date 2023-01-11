const formatoCorreto = (data) => data.length === 10 && data.includes('/');

const verificarWatchedAtExiste = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt || watchedAt === undefined) {
    res.status(400).send({
      message: 'O campo "watchedAt" é obrigatório',
    });
  } else {
    next();
  }
};

const verificarWatchedAtFormato = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (formatoCorreto(watchedAt)) {
    next();
  } else {
    res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
};

// const verificarWatchedAt = (req, res, next) => {
//   const { watchedAt } = req.body.talk;
//   if (!watchedAt || watchedAt === undefined) {
//     res.status(400).send({
//       message: 'O campo "watchedAt" é obrigatório',
//     });
//   } else if (formatoCorreto(watchedAt)) {
//     next();
//   } else {
//     res.status(400).send({
//       message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
//     });
//   }
// };

module.exports = {
  verificarWatchedAtExiste,
  verificarWatchedAtFormato,
};
