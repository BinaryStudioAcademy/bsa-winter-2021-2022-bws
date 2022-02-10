import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

async function up(knex: Knex): Promise<void[]> {
  const dateNowISO = getFormattedISODate(new Date());

  return Promise.all<Promise<void>[]>([
    knex.schema.table(TableName.GROUPS, function (table) {
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    }),
    knex.schema.table(TableName.GROUPS_PERMISSIONS, function (table) {
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    }),
    knex.schema.table(TableName.PERMISSIONS, function (table) {
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    }),
    knex.schema.table(TableName.USERS_GROUPS, function (table) {
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    }),
    knex.schema.table(TableName.WORKERS, function (table) {
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    }),
  ]);
}

async function down(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.table(TableName.GROUPS, function (table) {
      table.dropColumn('created_at');
    }),
    knex.schema.table(TableName.GROUPS_PERMISSIONS, function (table) {
      table.dropColumn('created_at');
    }),
    knex.schema.table(TableName.PERMISSIONS, function (table) {
      table.dropColumn('created_at');
    }),
    knex.schema.table(TableName.USERS_GROUPS, function (table) {
      table.dropColumn('created_at');
    }),
    knex.schema.table(TableName.WORKERS, function (table) {
      table.dropColumn('created_at');
    }),
  ]);
}

export { up, down };
