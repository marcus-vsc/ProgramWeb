
exports.up = function(knex) {
    return knex.schema.createTable('bankAccount', function (table) {
        table.string('id').primary();
        table.string('agencia').notNullable();
        table.string('banco').notNullable();
        table.string('nomeProprietario');
        table.string('idUsuario');
        table.double('saldo');
        table.foreign("idUsuario").references("id").inTable("users");
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('bankAccount');
};
