import { FC } from 'react';
import {
  InputType,
  ButtonType,
  AppRoute,
  ButtonStyle,
} from 'common/enums/enums';
import {
  useAppSelector,
  useState,
  useAppForm,
  useAppDispatch,
  useEffect,
} from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { Input, Button, Table } from 'components/common/common';
import { EAMWorkerCreateRequestDto } from 'common/types/types';
import { EamWorkerCreate as CreateWorkerValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { EAMWorkerConfigurate as EAMWorkerConfigurateActions } from 'store/actions';
import { DEFAULT_PAYLOAD } from './common/constants';
import { getRows, getColumns } from './helpers/helpers';

const EAMWorkerCreate: FC = () => {
  const dispatch = useAppDispatch();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const { tenantId, groups } = useAppSelector(
    ({ app, EAMWorkerConfigurate }) => ({
      tenantId: app.tenant?.id,
      groups: EAMWorkerConfigurate.groups,
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
  }, [dispatch, tenantId]);

  const handleAddGroupId = (id: string): void => {
    setSelectedGroups((prevState) => prevState.concat(id));
  };

  const handleRemoveGroupId = (id: string): void => {
    setSelectedGroups((prevState) => prevState.filter((it) => it !== id));
  };

  const handleIsCheckedId = (id: string): boolean => {
    return selectedGroups.some((it) => it === id);
  };

  const { control, errors, handleSubmit } =
    useAppForm<EAMWorkerCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateWorkerValidationSchema,
    });

  const handleFormSubmit = (payload: EAMWorkerCreateRequestDto): void => {
    dispatch(
      EAMWorkerConfigurateActions.workerCreate({
        ...payload,
        groupIds: selectedGroups,
      }),
    );
  };

  const columns = getColumns(
    handleAddGroupId,
    handleRemoveGroupId,
    handleIsCheckedId,
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
              />
            </li>
          </ul>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                btnStyle={ButtonStyle.OUTLINED}
                label="Cancel"
                to={AppRoute.EAM}
              />
            </div>
            <div className={styles.button}>
              <Button type={ButtonType.SUBMIT} label="Create" />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { EAMWorkerCreate };
