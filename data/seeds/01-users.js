const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {

  const hash = await bcrypt.hash("secret", 7)

  await knex("users").insert([
    {username: "Dwaine", password: hash, email: "dwaine@gmail.com"},
    {username: "Leah", password: hash, email: "Leah@email.com"},
    {username: "Wyatt", password: hash, email: "Wyatt@yahoo.com"},
    {username: "Ryan", password: hash, email: "Ryan@hotmail.com"},
  ]);
};
