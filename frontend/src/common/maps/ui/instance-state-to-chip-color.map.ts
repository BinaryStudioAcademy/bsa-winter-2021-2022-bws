import { InstanceState, ChipColor } from 'common/enums/enums';

const instanceStateToChipColor = {
  [InstanceState.CREATING]: ChipColor.DARK_ORANGE,
  [InstanceState.ACTIVE]: ChipColor.GREEN,
};

export { instanceStateToChipColor };
