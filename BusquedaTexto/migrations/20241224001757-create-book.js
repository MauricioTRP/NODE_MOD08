'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      isbn: {
        type: Sequelize.STRING
      },
      href: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.DATEONLY
      },
      stock: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    /**
     * Creamos campo search_vector calculado (No es necesario definirlo al crear un libro por primera vez)
     * 
     * GENERATED ALWAS AS -> TITLE, DESCRIPTION para generar Vector de Búsqueda
     * setweight Define cuanta importancia tiene cada campo en la generación del vector de búsqueda
     */
    await queryInterface.sequelize.query(`
      ALTER TABLE "books" ADD COLUMN "search_vector" TSVECTOR GENERATED ALWAYS AS 
      (setweight(to_tsvector('spanish', coalesce("title", '')), 'A') || setweight(to_tsvector('spanish', coalesce("description", '')), 'D')) STORED;
      `)

    /**
     * Crear índice sobre campo search_vector
     */
    await queryInterface.sequelize.query(`
        CREATE INDEX idx_search_vector ON "books" USING GIN (search_vector);
      `)

    /**
     * Create Función que actualiza registros
     */
    await queryInterface.sequelize.query(`
        CREATE FUNCTION books_trigger() RETURNS trigger AS $$
        begin
          new.search_vector :=
            setweight(to_tsvector('pg_catalog.spanish', coalesce(new.title,'')), 'A') ||
            setweight(to_tsvector('pg_catalog.spanish', coalesce(new.description,'')), 'D');
          return new;
        end
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
        ON books FOR EACH ROW EXECUTE FUNCTION books_trigger();
      `)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_search_vector;`)
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS tsvectorupdate ON books;`)
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS books_trigger();;`)
  }
};