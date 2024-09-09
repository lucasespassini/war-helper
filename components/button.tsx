import {
  Button as ButtonDefault,
  ButtonProps as ButtonPropsDefault,
  Text,
} from "@rneui/themed";

type ButtonProps = {} & ButtonPropsDefault;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <ButtonDefault
      {...rest}
      containerStyle={{ borderRadius: 30 }}
      buttonStyle={{
        paddingHorizontal: 30,
        opacity: rest.disabled ? 0.5 : 1,
      }}
    >
      <Text style={{ color: "#000", fontSize: 16, fontWeight: 700 }}>
        {children}
      </Text>
    </ButtonDefault>
  );
};
