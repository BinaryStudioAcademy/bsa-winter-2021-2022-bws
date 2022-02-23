import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId } from 'helpers/helpers';
import { EAMCreateWorkerCSVColumn } from 'common/enums/enums';

const workerCreate = createAsyncThunk<
  string[][],
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMWorkerCreateRequestDto, { extra }) => {
    const { workerApi, notification } = extra;

    const password = getRandomId();

    await workerApi.createWorker({
      ...payload,
      password,
    });

    const csvColumns = [
      [EAMCreateWorkerCSVColumn.NAME, payload.name],
      [EAMCreateWorkerCSVColumn.PASSWORD, password],
    ];

    notification.success('Success!', 'User has been successfully created');

    return csvColumns;
  },
);

const saveCSV = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SAVE_CSV,
  async (_payload, { extra, getState }) => {
    const { saver } = extra;
    const { EAMWorkerConfigurate } = getState();

    const { csvColumns } = EAMWorkerConfigurate;

    saver.saveCSV(csvColumns, `${csvColumns[0][1]}-worker-credentials`);
  },
);

const getGroups = createAsyncThunk<
  EAMGroupGetByTenantResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (filter, { extra }) => {
  const { eamApi } = extra;
  return eamApi.loadGroups(filter);
});

export { workerCreate, getGroups, saveCSV };
