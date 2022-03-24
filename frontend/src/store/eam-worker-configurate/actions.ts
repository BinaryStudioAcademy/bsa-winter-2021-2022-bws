import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  NotificationTitle,
  NotificationMessage,
  EAMCreateWorkerCSVColumn,
} from 'common/enums/enums';
import {
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId } from 'helpers/helpers';

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

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.EAM_WORKER_CREATE,
    );

    return csvColumns;
  },
);

const saveCSV = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SAVE_CSV,
  async (_payload, { extra, getState }) => {
    const { saver } = extra;
    const { EAMWorkerConfigurate } = getState();

    const { csvColumns } = EAMWorkerConfigurate;
    const [[, name]] = csvColumns;

    saver.saveCSV(csvColumns, `${name}-worker-credentials`);
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

const cleanupCSV = createAction(ActionType.CLEANUP_CSV);

export { workerCreate, getGroups, saveCSV, cleanupCSV };
