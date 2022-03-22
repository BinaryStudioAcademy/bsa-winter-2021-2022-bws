import { FC } from 'react';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useSelectedItems,
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
import {
  EAMGroupConfigurateRequestDto,
  EAMGroupUpdateRequestDto,
} from 'common/types/types';
import { eamGroupConfigurate as eamGroupConfigurateValidationSchema } from 'validation-schemas/validation-schemas';
import { WorkersTable, PermissionsTable } from './components/components';

const EAMConfigurateGroup: FC = () => {
  const dispatch = useAppDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    if (id) {
      dispatch(EAMGroupConfigurateActions.getGroupById({ id }));
    }
  }, [id]);

  const { tenantId, group } = useAppSelector(
    ({ app, EAMGroupConfigurate }) => ({
      tenantId: app.tenant?.id,
      group: id ? EAMGroupConfigurate.group : null,
    }),
  );

  useEffect(() => {
    if (!tenantId) {
      return;
    }
    dispatch(
      EAMGroupConfigurateActions.loadWorkers({
        from: 0,
        count: 10,
        tenantId: tenantId as string,
      }),
    );
    dispatch(EAMGroupConfigurateActions.getPermission());
  }, [dispatch, tenantId, group]);

  const { control, errors, handleSubmit, handleReset } =
    useAppForm<EAMGroupConfigurateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
      validationSchema: eamGroupConfigurateValidationSchema,
    });

  const selectedWorkers = useSelectedItems<string>([]);
  const selectedPermissions = useSelectedItems<string>([]);

  useEffect(() => {
    if (group) {
      handleReset({ name: group.name });
      selectedWorkers.handleReset(group.workersIds);
      selectedPermissions.handleReset(group.permissionsIds);
    }
  }, [group]);

  const handleFormSubmit = (payload: EAMGroupConfigurateRequestDto): void => {
    if (group) {
      const newPayload: EAMGroupUpdateRequestDto = {
        id: group.id,
        name: payload.name,
        workersIds: selectedWorkers.selectedItems,
        permissionsIds: selectedPermissions.selectedItems,
      };
      dispatch(EAMGroupConfigurateActions.update(newPayload));
    } else {
      const newPayload: EAMGroupConfigurateRequestDto = {
        name: payload.name,
        workersIds: selectedWorkers.selectedItems,
        permissionsIds: selectedPermissions.selectedItems,
      };
      dispatch(EAMGroupConfigurateActions.create(newPayload));
    }
  };

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
              <WorkersTable
                selectedWorkers={selectedWorkers.selectedItems}
                handleIsCheckedId={selectedWorkers.handleCheck}
                handleRemoveWorkerId={selectedWorkers.handleRemove}
                handleAddWorkerId={selectedWorkers.handleAdd}
              />
            </li>
            <li>
              <PermissionsTable
                selectedPermissions={selectedPermissions.selectedItems}
                handleIsCheckedPermissionId={selectedPermissions.handleCheck}
                handleRemovePermissionId={selectedPermissions.handleRemove}
                handleAddPermissionId={selectedPermissions.handleAdd}
              />
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
                label={group ? 'Save' : 'Create'}
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { EAMConfigurateGroup };
