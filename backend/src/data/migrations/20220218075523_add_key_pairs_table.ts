import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.KEY_PAIRS;
async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .primary({ constraintName: 'key_pairs_pkey' });
    table.text('ssh_pem_file_content').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
