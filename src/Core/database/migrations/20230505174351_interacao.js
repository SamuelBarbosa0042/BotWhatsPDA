/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pda_tb_interacao', table => {
      table.increments('codigoInteracao');
      table.string('numeroTelefone')
      table.string('dialogo');
      table.date('DataInicio')

    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
