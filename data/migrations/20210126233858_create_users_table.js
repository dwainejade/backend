
exports.up = async function (knex) {
    await knex.schema
        .createTable("users", (table) => {
            table.increments("id");
            table.string("username").unique().notNull();
            table.string("password").notNull();
            table.string("email").notNull();
        })
        .createTable("plants", (table) => {
            table.increments("id");
            table.string("nickname").notNull();
            table.string("species").notNull();
            table.string("h2oFrequency").notNull();
            table.string("details");
            table.date("last_watered");
            table.integer("user_id")
                .unsigned()
                .notNull()
                .references("id")
                .inTable("users")
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.string("image")
        })
};

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists("plants")
        .dropTableIfExists("users")
};