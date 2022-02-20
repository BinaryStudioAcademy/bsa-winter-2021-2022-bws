import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.INSTANCES;

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .uuid('tenant_id')
      .references('id')
      .inTable(TableName.TENANTS)
      .notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn('tenant_id');
  });
}

export { up, down };
