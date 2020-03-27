exports.up = function(knex) {
  return knex.schema.createTable('contact', contactTable => {
    contactTable
      .increments('contact_id')
      .primary()
      .unique();
    contactTable.string('name').notNullable();
    contactTable.string('email').notNullable();
    contactTable.timestamp('created_at').defaultTo(knex.fn.now());
    contactTable.string('comment', 1500).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contact');
};
