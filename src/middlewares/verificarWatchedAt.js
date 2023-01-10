const verificarWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt || watchedAt === undefined) {
    res.status(400).send({
      message: 'O campo "watchedAt" é obrigatório',
    });
  } else if (formatoCorreto(watchedAt)) {
    next();
  } else {
    res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
};

const formatoCorreto = (data) => {
  const [dia, mes, ano] = data.split('/');

  if (!dia || !mes || !ano) {
    return false;
  }

  return dia.length === 2 && mes.length === 2 && ano.length === 4;
};

module.exports = verificarWatchedAt;
