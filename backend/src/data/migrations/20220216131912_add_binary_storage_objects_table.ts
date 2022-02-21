import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.OBJECTS;
async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'objects_pkey' });
    table.string('name', 20).notNullable();
    table.integer('size_in_bytes').notNullable();
    table.dateTime('created_at').notNullable();
    table
      .uuid('space_id')
      .notNullable()
      .references('id')
      .inTable(TableName.SPACES);
    table
      .uuid('uploaded_by')
      .notNullable()
      .references('id')
      .inTable(TableName.WORKERS);
    table.string('aws_object_key').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
