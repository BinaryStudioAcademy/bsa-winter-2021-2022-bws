import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';
import { getFormattedISODate } from '~/helpers/helpers';

const TABLE_NAME = TableName.FUNCTIONS;

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  return knex.schema.table(TABLE_NAME, function (table) {
    table.dateTime('updated_at').notNullable().defaultTo(dateNowISO);
    table.dropNullable('created_by');
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.dropColumn('updated_at');
    table.setNullable('created_by');
  });
}

export { up, down };
