import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.FUNCTIONS;

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  await knex.raw('CREATE SCHEMA IF NOT EXISTS serverless_computing;');

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'functions_pkey' });
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.text('source_code').notNullable();
    table.uuid('created_by').references('id').inTable(TableName.WORKERS);
    table.string('aws_lambda_id').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
