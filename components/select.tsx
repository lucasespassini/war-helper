import { Icon, IconProps, Text } from "@rneui/themed";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export type Item = { value: string; label: string; icon?: IconProps };
type SelectProps = {
  name: string;
  options: Item[];
  disabledOptions?: number[];
};

export const Select = ({ name, options, disabledOptions }: SelectProps) => {
  const { control } = useFormContext();

  const renderButton = (selectedItem: Item | undefined) => {
    return (
      <View
        style={{
          paddingVertical: 7,
          width: 100,
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
          borderBottomWidth: 1,
          borderColor: "#000",
        }}
      >
        {selectedItem?.icon && <Icon {...selectedItem?.icon} />}
        <Text>{(selectedItem && selectedItem.label) || "Cor"}</Text>
      </View>
    );
  };

  const renderItem = (selectedItem: Item | undefined, idx: number) => {
    return (
      <View
        style={{
          paddingVertical: 5,
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
          opacity: disabledOptions?.includes(idx) ? 0.5 : 1,
        }}
      >
        {selectedItem?.icon && <Icon {...selectedItem?.icon} />}
        <Text style={{ color: "#151E26" }}>{selectedItem?.label}</Text>
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SelectDropdown
          ref={field.ref}
          data={options}
          onSelect={(selectedItem: Item | undefined) =>
            field.onChange(selectedItem?.value)
          }
          renderButton={renderButton}
          renderItem={renderItem}
          disabledIndexes={disabledOptions}
          dropdownStyle={{
            padding: 2,
            backgroundColor: "#E9ECEF",
            borderRadius: 8,
          }}
        />
      )}
    />
  );
};
