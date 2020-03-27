exports.up = function(knex) {
  return knex.schema.createTable('contact', contactTable => {
    contactTable
      .increments('contact_id')
      .primary()
      .unique();
    contactTable
      .string('author')
      .references('users.username')
      .notNullable();
    contactTable
      .integer('article_id')
      .references('articles.article_id')
      .onDelete('CASCADE');
    contactTable.integer('votes').defaultTo(0);
    contactTable.timestamp('created_at').defaultTo(knex.fn.now());
    contactTable.string('body', 1500).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
