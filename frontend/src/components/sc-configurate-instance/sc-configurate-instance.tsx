import { FC } from 'react';
import { useAppSelector, useParams } from 'hooks/hooks';
import {
  CreateInstanceForm,
  UpdateInstanceForm,
} from './components/components';
import { Loader } from 'components/common/common';
import styles from './styles.module.scss';
import { DataStatus } from 'common/enums/enums';

const SCConfigurateInstance: FC = () => {
  const { instanceDataStatus } = useAppSelector(
    ({ SCConfigurateInstance }) => ({
      instanceDataStatus: SCConfigurateInstance.instanceDataStatus,
    }),
  );
  const isLoading = instanceDataStatus === DataStatus.PENDING;

  const { id } = useParams();
  const title = id ? 'Edit Instance' : 'Create Instance';

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SC - <br />
        Server Computing
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.formWrapper}>
          <h3 className={styles.formTitle}>{title}</h3>
          {id ? <UpdateInstanceForm id={id} /> : <CreateInstanceForm />}
        </section>
      )}
    </div>
  );
};

export { SCConfigurateInstance };
