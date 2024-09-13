import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type DiceProps = {
  number: number;
  isAttacker: boolean;
};

const defaultProps: StyleProp<ViewStyle> = {
  width: 12,
  height: 12,
  backgroundColor: "#000",
  borderRadius: 999,
  position: "absolute",
};

const Dot1 = () => {
  return (
    <View
      style={{
        ...defaultProps,
        right: "50%",
        bottom: "50%",
        transform: [{ translateX: 6 }, { translateY: 6 }],
      }}
    />
  );
};
const Dot2 = () => {
  return (
    <>
      <View
        style={{
          ...defaultProps,
          left: 5,
          top: 5,
        }}
      />
      <View
        style={{
          ...defaultProps,
          right: 5,
          bottom: 5,
        }}
      />
    </>
  );
};
const Dot3 = () => {
  return (
    <>
      <View
        style={{
          ...defaultProps,
          left: 5,
          top: 5,
        }}
      />
      <View
        style={{
          ...defaultProps,
          right: "50%",
          bottom: "50%",
          transform: [{ translateX: 6 }, { translateY: 6 }],
        }}
      />
      <View
        style={{
          ...defaultProps,
          right: 5,
          bottom: 5,
        }}
      />
    </>
  );
};
const Dot4 = () => {
  return (
    <>
      <View
        style={{
          ...defaultProps,
          left: 5,
          top: 5,
        }}
      />
      <View
        style={{
          ...defaultProps,
          left: 5,
          bottom: 5,
        }}
      />

      <View
        style={{
          ...defaultProps,
          right: 5,
          top: 5,
        }}
      />
      <View
        style={{
          ...defaultProps,
          right: 5,
          bottom: 5,
        }}
      />
    </>
  );
};
const Dot5 = () => {
  return (
    <>
      <View
        style={{
          ...defaultProps,
          left: 5,
          top: 5,
        }}
      />
      <View
        style={{
          ...defaultProps,
          left: 5,
          bottom: 5,
        }}
      />

      <View
        style={{
          ...defaultProps,
          right: "50%",
          bottom: "50%",
          transform: [{ translateX: 6 }, { translateY: 6 }],
        }}
      />

      <View
        style={{
          ...defaultProps,
          right: 5,
          top: 5,
        }}
      />
      <View
        style={{
          ...defaultProps,
          right: 5,
          bottom: 5,
        }}
      />
    </>
  );
};

const Dot6 = () => {
  return (
    <>
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#000",
          borderRadius: 999,
          position: "absolute",
          left: 5,
          top: 5,
        }}
      />
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#000",
          borderRadius: 999,
          position: "absolute",
          left: 5,
          bottom: "50%",
          transform: [{ translateY: 6 }],
        }}
      />
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#000",
          borderRadius: 999,
          position: "absolute",
          left: 5,
          bottom: 5,
        }}
      />

      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#000",
          borderRadius: 999,
          position: "absolute",
          right: 5,
          top: 5,
        }}
      />
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#000",
          borderRadius: 999,
          position: "absolute",
          right: 5,
          bottom: "50%",
          transform: [{ translateY: 6 }],
        }}
      />
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#000",
          borderRadius: 999,
          position: "absolute",
          right: 5,
          bottom: 5,
        }}
      />
    </>
  );
};

const getDiceNumber = (d: number) => {
  switch (d) {
    case 1:
      return <Dot1 />;
    case 2:
      return <Dot2 />;
    case 3:
      return <Dot3 />;
    case 4:
      return <Dot4 />;
    case 5:
      return <Dot5 />;
    case 6:
      return <Dot6 />;
    default:
      return <Dot1 />;
  }
};

export const Dice = ({ number, isAttacker }: DiceProps) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: isAttacker ? "#de0000" : "#e6d200",
        position: "relative",
        borderRadius: 5,
      }}
    >
      {getDiceNumber(number)}
    </View>
  );
};
