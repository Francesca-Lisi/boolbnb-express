const notFound = (req, res, next) => {
  res.status(404);
  res.json({
    message: 'Risorsa non trovata',
    status: 404,
    error: 'Not Found'
  })
}

module.exports = notFound;