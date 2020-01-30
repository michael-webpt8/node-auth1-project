exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('username', 128)
      .unique()
      .notNullable();
    tbl.text('password').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
