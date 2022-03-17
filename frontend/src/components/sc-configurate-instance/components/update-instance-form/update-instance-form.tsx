import { FC } from 'react';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { SCInstanceUpdateRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { SCConfigurateInstance as scActions } from 'store/actions';
import { scInstanceUpdate as UpdateInstanceValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  id: string;
};

const UpdateInstanceForm: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { instances } = useAppSelector(({ sc }) => ({
    instances: sc.instances,
  }));

  useEffect(() => {
    if (!instances.length) {
      navigate(AppRoute.SC);
    }
  }, []);

  const instanceName = instances.find((item) => item.id === id)?.name;

  const { control, errors, handleSubmit } =
    useAppForm<SCInstanceUpdateRequestDto>({
      defaultValues: { name: instanceName },
      validationSchema: UpdateInstanceValidationSchema,
    });

  const handleFormSubmit = (payload: SCInstanceUpdateRequestDto): void => {
    if (payload.name === instanceName) {
      navigate(AppRoute.SC);
      return;
    }

    dispatch(
      scActions.updateInstance({
        payload,
        params: {
          id: id as string,
        },
      }),
    );
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
              placeholder=""
              name={getNameOf<SCInstanceUpdateRequestDto>('name')}
              control={control}
              errors={errors}
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
          <Button type={ButtonType.SUBMIT} label="Edit" />
        </div>
      </div>
    </form>
  );
};

export { UpdateInstanceForm };
