import { Chip } from 'components/common/common';
import { InstanceState } from 'common/enums/enums';
import { instanceStateToChipColor } from 'common/maps/maps';

const StateCell = (state: InstanceState): JSX.Element => (
  <Chip chipColor={instanceStateToChipColor[state]}>{state}</Chip>
);

export { StateCell };
