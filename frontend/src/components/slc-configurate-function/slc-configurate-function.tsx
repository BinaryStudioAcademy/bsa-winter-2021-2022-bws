import { FC } from 'react';
import { useAppForm } from 'hooks/hooks';
import { SLCFunctionCreateRequestDto } from 'common/types/types';
import { DEFAULT_PAYLOAD } from './common/constants';
import { slcFunctionCreate as CreateSLCFunctionValidationSchema } from 'validation-schemas/validation-schemas';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';

import styles from './styles.module.scss';

const SLCConfigurateFunction: FC = () => {
  const { control, errors } = useAppForm<SLCFunctionCreateRequestDto>({
    defaultValues: DEFAULT_PAYLOAD,
    validationSchema: CreateSLCFunctionValidationSchema,
  });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SLC - <br />
        ServerLess Computing
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Function</h3>
        <form>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputTitle}>Function name</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  label=""
                  placeholder=""
                  name={getNameOf<SLCFunctionCreateRequestDto>('name')}
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
                to={AppRoute.SLC}
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

export { SLCConfigurateFunction };
