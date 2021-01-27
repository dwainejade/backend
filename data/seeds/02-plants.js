
exports.seed = async function(knex) {
  await knex("plants").insert([
    {nickname: "Monster", species: "Monstera deliciosa", h2oFrequency: "every other week", user_id: 1}
  ]);
};