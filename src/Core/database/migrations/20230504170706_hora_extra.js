/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pda_tb_hora', table => {
      table.increments('codigo_hora');
      table.integer('quantidade_horas');
      table.string('data');
      table.string('comentario');
      table.string('chamado');
      table.string('numeroTelefone');
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
