import { FC } from 'react';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { SCInstanceCreateRequestDto } from 'common/types/types';
import { Button, Input, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useAppForm,
  useEffect,
} from 'hooks/hooks';
import { SCConfigurateInstance as scActions } from 'store/actions';
import { scInstanceCreate as CreateInstanceValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_PAYLOAD } from '../common/constants';
import { getOperationSystemOptions } from '../helpers/helpers';
import styles from './styles.module.scss';

const CreateInstanceForm: FC = () => {
  const dispatch = useAppDispatch();
  const { operationSystems } = useAppSelector(({ SCConfigurateInstance }) => ({
    operationSystems: SCConfigurateInstance.operationSystems,
  }));

  const { control, errors, handleSubmit } =
    useAppForm<SCInstanceCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateInstanceValidationSchema,
    });

  useEffect(() => {
    dispatch(scActions.loadOperationSystems());
  }, []);

  const handleFormSubmit = (payload: SCInstanceCreateRequestDto): void => {
    dispatch(scActions.createInstance(payload));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ul className={styles.inputGroups}>
        <li className={styles.inputGroup}>
          <h3 className={styles.inputTitle}>Instance name</h3>
          <div className={styles.inputWrapper}>
            <Input
              type={InputType.TEXT}
              label=""
              placeholder="Name..."
              name={getNameOf<SCInstanceCreateRequestDto>('name')}
              control={control}
              errors={errors}
            />
          </div>
          <h3 className={styles.inputTitle}>Operation system</h3>
          <div className={styles.inputWrapper}>
            <Select
              label=""
              placeholder="Select OS..."
              options={getOperationSystemOptions(operationSystems)}
              name={getNameOf<SCInstanceCreateRequestDto>('operationSystemId')}
              control={control}
              errors={errors}
            />
          </div>
          <h3 className={styles.inputTitle}>User data</h3>
          <div className={styles.inputWrapper}>
            <Input
              label=""
              placeholder="Additional commands (optional)..."
              name={getNameOf<SCInstanceCreateRequestDto>('userData')}
              control={control}
              errors={errors}
              rows={10}
            />
          </div>
        </li>
      </ul>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button
            btnStyle={ButtonStyle.OUTLINED}
            label="Cancel"
            to={AppRoute.SC}
          />
        </div>
        <div className={styles.button}>
          <Button type={ButtonType.SUBMIT} label="Save" />
        </div>
      </div>
    </form>
  );
};

export { CreateInstanceForm };
