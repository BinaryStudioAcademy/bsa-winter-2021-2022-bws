import { FC } from 'react';
import { ServicesItem } from '../services-item/services-item';

const ServicesList: FC = () => (
  <ul>
    <li>
      <ServicesItem />
    </li>
  </ul>
);

export { ServicesList };
