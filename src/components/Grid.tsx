/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

interface ControlledTextFieldProps<T extends Record<string, any>> {
  name: string;
  control: Control<T>;
  rules?: {
    [key: string]: any;
  };
  label: string;
  style?: React.CSSProperties;
  error: string;
  type?: string;
  [key: string]: any;
}

const ChallengeInput = <T extends Record<string, any>>({
  name,
  control,
  rules,
  label,
  style,
  error,
  type,
  ...props
}: ControlledTextFieldProps<T>) => (
  <Controller
    name={name as any}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField
        {...props}
        label={label}
        type={type || 'text'}
        value={field.value}
        onChange={(event) => field.onChange(event.target.value)}
        error={!!fieldState.error}
        helperText={fieldState.error ? error : ''}
        style={{ marginBottom: 20, ...style }}
      />
    )}
  />
);

export default ChallengeInput;
