import { FC } from 'react';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useSelectedItems,
} from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { Button, Input } from 'components/common/common';
import { EAMWorkerCreateRequestDto } from 'common/types/types';
import { eamWorkerCreate as CreateWorkerValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { EAMWorkerConfigurate as EAMWorkerConfigurateActions } from 'store/actions';
import { DEFAULT_PAYLOAD } from './common/constants';
import { GroupTable } from './components/components';

const EAMConfigurateWorker: FC = () => {
  const dispatch = useAppDispatch();
  const selectedGroups = useSelectedItems<string>([]);
  const { tenantId, csvColumns } = useAppSelector(
    ({ app, EAMWorkerConfigurate }) => ({
      tenantId: app.tenant?.id,
      csvColumns: EAMWorkerConfigurate.csvColumns,
    }),
  );

  useEffect(() => {
    if (tenantId) {
      dispatch(
        EAMWorkerConfigurateActions.getGroups({
          tenantId: tenantId as string,
          from: 0,
          count: 100,
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
              <GroupTable
                handleAddGroupId={selectedGroups.handleAdd}
                handleRemoveGroupId={selectedGroups.handleRemove}
                handleIsCheckedGroupId={selectedGroups.handleCheck}
                selectedGroup={selectedGroups.selectedItems}
              />
            </li>
          </ul>
          <div className={styles.buttonContainer}>
            <div className={styles.saveBtnWrapper}>
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
