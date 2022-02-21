import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.OPERATION_SYSTEMS;

const operationSystem = [
  {
    name: 'ubuntu-server-18',
    awsGenerationName: 'ami-042ad9eec03638628',
  },
  {
    name: 'ubuntu-server-20',
    awsGenerationName: 'ami-0d527b8c289b4af7f',
  },
  {
    name: 'debian',
    awsGenerationName: 'ami-0245697ee3e07e755',
  },
  {
    name: 'windows-server-2019',
    awsGenerationName: 'ami-09d416ef29471299a',
  },
];

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  await knex.raw('CREATE SCHEMA IF NOT EXISTS server_computing;');

  await knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'operation_systems_pkey' });
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.string('aws_generation_name').notNullable();
  });

  return knex.insert(operationSystem).into(TABLE_NAME);
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
