/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pda_tb_usuario', table => {
      table.increments('codigo_usuario');
      table.string('usuario');
      table.string('numero');
      table.string('email');
      table.string('emailHead');

    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
