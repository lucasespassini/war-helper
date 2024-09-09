import {
  Input as InputDefault,
  InputProps as InputPropsDefault,
} from "@rneui/themed";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = { name: string } & InputPropsDefault;

export const Input = ({ name, ...rest }: InputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <InputDefault
          ref={field.ref}
          errorMessage={error?.message}
          errorStyle={{ color: "red" }}
          style={{ color: "#fff" }}
          onBlur={field.onBlur}
          value={field.value}
          onChangeText={field.onChange}
          {...rest}
        />
      )}
    />
  );
};
