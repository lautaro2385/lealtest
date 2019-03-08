'use strict'

function pagination (req, res, next) {
  let limit = req.query.limit || 50
  let page = req.query.page || 0
  try {
    limit = Number(limit)
    page = Number(page)
  } catch (e) {
    limit = 50
    page = 0
  }
  req.limit = limit
  req.page = page
  next()
}

module.exports = pagination
