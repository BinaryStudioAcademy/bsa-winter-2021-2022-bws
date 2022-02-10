// type Props={

// }
import { Input, Button } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './commom/constants';
import { GroupDto } from 'common/types/types';
import { getNameOf } from 'helpers/helpers';
import { ButtonType, InputType } from 'common/enums/enums';
import { group as groupValidationSchema } from 'validation-schemas/validation-schemas';
type Props = {
  onSubmit: (payload: GroupDto) => void;
};
const EamCreateGroup: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<GroupDto>({
    defaultValues: DEFAULT_GROUP_PAYLOAD,
    validationSchema: groupValidationSchema,
  });

  return (
    <>
      <h1>Greate group</h1>
      <h2>Name the group</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type={InputType.TEXT}
            label="Group Name"
            placeholder=""
            name={getNameOf<GroupDto>('name')}
            control={control}
            errors={errors}
          />
        </div>

        <Button type={ButtonType.SUBMIT} label="Cancel" />
        <Button type={ButtonType.SUBMIT} label="Create" />
      </form>
    </>
  );
};
export { EamCreateGroup };
