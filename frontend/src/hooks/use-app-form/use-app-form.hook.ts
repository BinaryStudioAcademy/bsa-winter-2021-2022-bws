import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormControlErrors,
  FormControlValues,
  ValidationSchema,
  UseFormHandleSubmit,
  UseFormReset,
} from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  errors: FormControlErrors;
  handleSubmit: UseFormHandleSubmit<T>;
  handleReset: UseFormReset<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormControlValues>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    control,
    errors,
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    handleReset: reset as UseFormReset<T>,
  };
};

export { useAppForm };
