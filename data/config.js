const knex = require("knex")
const knexfile = require("../knexfile")

if (process.env.NODE_ENV) {
    environment = process.env.NODE_ENV
} else {
    environment = knexfile.development
}

module.exports = knex(knexfile[environment])
