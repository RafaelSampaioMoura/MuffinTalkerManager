const verificarToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({
      message: 'Token não encontrado',
    });
  } else if (authorization.length < 16 || typeof authorization !== 'string') {
    res.status(401).send({
      message: 'Token inválido',
    });
  } else {
    next();
  }
};

module.exports = verificarToken;
