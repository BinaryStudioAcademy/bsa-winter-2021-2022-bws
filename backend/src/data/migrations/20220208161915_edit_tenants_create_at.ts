import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.TENANTS;

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  return knex.schema.table(TABLE_NAME, function (table) {
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.dropColumn('created_at');
  });
}

export { up, down };
