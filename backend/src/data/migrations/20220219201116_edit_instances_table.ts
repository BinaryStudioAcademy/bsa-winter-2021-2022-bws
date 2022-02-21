import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.INSTANCES;

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.renameColumn('key_pairs_id', 'key_pair_id');
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.renameColumn('key_pair_id', 'key_pairs_id');
  });
}

export { up, down };
