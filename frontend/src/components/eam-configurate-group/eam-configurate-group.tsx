import React, { FC, useMemo } from 'react';
import { Button, Input, Table } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { EAMGroupConfigurate as EAMGroupConfigurateActions } from 'store/actions';
import styles from './styles.module.scss';
import { EAMGroupConfigurateRequestDto } from 'common/types/types';
import { getRows, getColumns } from './helpers/helpers';
import { eamGroupConfigurate as CreateGroupValidationSchema } from 'validation-schemas/validation-schemas';

const EAMConfigurateGroup: FC = () => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMGroupConfigurateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
      validationSchema: CreateGroupValidationSchema,
    });

  const { tenantId, workers } = useAppSelector(
    ({ app, EAMGroupConfigurate }) => ({
      tenantId: app.tenant?.id,
      workers: EAMGroupConfigurate.workers,
    }),
  );

  const dispatch = useAppDispatch();

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  const handleAddWorkerId = (id: string): void => {
    setSelectedWorkers((prevState) => prevState.concat(id));
  };

  const handleRemoveWorkerId = (id: string): void => {
    setSelectedWorkers((prevState) => prevState.filter((it) => it !== id));
  };

  const handleIsCheckedId = (id: string): boolean => {
    return selectedWorkers.some((it) => it === id);
  };

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    dispatch(
      EAMGroupConfigurateActions.getWorkers({
        from: 0,
        count: 10,
        tenantId: tenantId as string,
      }),
    );
  }, [dispatch, tenantId]);

  const handleFormSubmit = (payload: EAMGroupConfigurateRequestDto): void => {
    const newPayload: EAMGroupConfigurateRequestDto = {
      name: payload.name,
      workersIds: selectedWorkers,
    };
    dispatch(EAMGroupConfigurateActions.create(newPayload));
  };

  const columns = useMemo(
    () =>
      getColumns(handleAddWorkerId, handleRemoveWorkerId, handleIsCheckedId),
    [selectedWorkers],
  );

  const data = useMemo(() => getRows(workers), [workers]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Group</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputGroupTitle}>Name the group</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  placeholder="Enter a name to identify this group"
                  label=""
                  name={getNameOf<EAMGroupConfigurateRequestDto>('name')}
                  control={control}
                  errors={errors}
                />
              </div>
            </li>
            <li>
              <h3 className={styles.inputGroupTitle}>
                Add workers to the Group - Optional
              </h3>
              <Table className={styles.table} columns={columns} data={data} />
            </li>
          </ul>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                to={AppRoute.EAM}
                label="Cancel"
                btnStyle={ButtonStyle.OUTLINED}
              />
            </div>
            <div className={styles.button}>
              <Button
                className={styles.button}
                type={ButtonType.SUBMIT}
                label="Create"
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { EAMConfigurateGroup };
