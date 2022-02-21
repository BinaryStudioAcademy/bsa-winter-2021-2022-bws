import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.SPACES;
async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE SCHEMA IF NOT EXISTS binary_storage;');

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'space_pkey' });
    table.string('name', 20).notNullable();
    table.dateTime('created_at').notNullable();
    table
      .uuid('created_by')
      .notNullable()
      .references('id')
      .inTable(TableName.WORKERS);
    table.string('aws_s3_id').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
