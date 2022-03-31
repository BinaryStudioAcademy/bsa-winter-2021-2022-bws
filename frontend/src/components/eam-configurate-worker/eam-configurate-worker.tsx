import { FC } from 'react';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
  Pagination,
} from 'common/enums/enums';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useSelectedItems,
  usePagination,
} from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { Button, Input, Table } from 'components/common/common';
import { EAMWorkerCreateRequestDto } from 'common/types/types';
import { eamWorkerCreate as CreateWorkerValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { EAMWorkerConfigurate as EAMWorkerConfigurateActions } from 'store/actions';
import { DEFAULT_PAYLOAD } from './common/constants';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const EAMConfigurateWorker: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const selectedGroups = useSelectedItems<string>([]);
  const { tenantId, groups, csvColumns, countItems } = useAppSelector(
    ({ app, EAMWorkerConfigurate }) => ({
      tenantId: app.tenant?.id,
      groups: EAMWorkerConfigurate.groups,
      csvColumns: EAMWorkerConfigurate.csvColumns,
      countItems: EAMWorkerConfigurate.countItems,
    }),
  );

  useEffect(() => {
    if (tenantId) {
      dispatch(
        EAMWorkerConfigurateActions.getGroups({
          tenantId: tenantId as string,
          from: 0,
          count: 5,
        }),
      );
    }

    return (): void => {
      dispatch(EAMWorkerConfigurateActions.cleanupCSV());
    };
  }, [dispatch, tenantId]);

  const { control, errors, handleSubmit, handleReset } =
    useAppForm<EAMWorkerCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateWorkerValidationSchema,
    });

  const handleFormSubmit = (payload: EAMWorkerCreateRequestDto): void => {
    dispatch(
      EAMWorkerConfigurateActions.workerCreate({
        ...payload,
        groupIds: selectedGroups.selectedItems,
      }),
    );

    const hasSelectedItems = Boolean(selectedGroups.selectedItems.length);
    if (hasSelectedItems) {
      handleReset();
    }
    selectedGroups.handleRemoveAll();
  };

  const handleSave = (): void => {
    dispatch(EAMWorkerConfigurateActions.saveCSV());
  };

  const hasCsvColumns = Boolean(csvColumns.length);

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      EAMWorkerConfigurateActions.getGroups({
        tenantId: tenantId as string,
        from: from,
        count: count,
      }),
    );
  };

  const groupPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const columns = getColumns(
    selectedGroups.handleAdd,
    selectedGroups.handleRemove,
    selectedGroups.handleCheck,
  );

  const data = getRows(groups);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Worker</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputGroupTitle}>Worker name</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  label=""
                  placeholder=""
                  name={getNameOf<EAMWorkerCreateRequestDto>('name')}
                  control={control}
                  errors={errors}
                />
              </div>
            </li>
            <li>
              <h3 className={styles.inputGroupTitle}>Add worker to group </h3>
              <Table
                className={styles.table}
                title="Groups"
                columns={columns}
                data={data}
                pagination={groupPagination}
                placeholder="No groups to display"
              />
            </li>
          </ul>
          <div className={styles.buttonContainer}>
            <div className={styles.saveBtnWrapper} data-testid="save-csv-btn">
              {hasCsvColumns && (
                <button
                  className={styles.saveBtn}
                  type={ButtonType.BUTTON}
                  onClick={handleSave}
                >
                  Save csv
                </button>
              )}
            </div>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button
                  btnStyle={ButtonStyle.OUTLINED}
                  label="Cancel"
                  to={AppRoute.EAM}
                />
              </div>
              <div className={styles.button}>
                <Button type={ButtonType.SUBMIT} label="Save" />
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { EAMConfigurateWorker };
