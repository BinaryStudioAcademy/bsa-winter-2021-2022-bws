import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.INSTANCES;
async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'instances_pkey' });
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.uuid('key_pairs_id').references('id').inTable(TableName.KEY_PAIRS);
    table.string('username').notNullable();
    table.string('hostname').notNullable();
    table
      .uuid('operation_system_id')
      .references('id')
      .inTable(TableName.OPERATION_SYSTEMS);
    table.uuid('created_by').references('id').inTable(TableName.WORKERS);
    table.string('aws_instance_id').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
