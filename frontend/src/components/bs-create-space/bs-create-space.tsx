import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { BSSpaceCreateRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { FC } from 'react';
import { BSSpace as BSSpaceActions } from 'store/actions';
import { bsSpaceCreate as CreateSpaceValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { DEFAULT_PAYLOAD } from './common/constants';

const BSCreateSpace: FC = () => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } = useAppForm<BSSpaceCreateRequestDto>(
    {
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateSpaceValidationSchema,
    },
  );

  const handleFormSubmit = (payload: BSSpaceCreateRequestDto): void => {
    dispatch(BSSpaceActions.createSpace(payload));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Space</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputTitle}>Space name</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  label=""
                  placeholder=""
                  name={getNameOf<BSSpaceCreateRequestDto>('name')}
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
                to={AppRoute.BS}
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

export { BSCreateSpace };
