import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import tw from "@/lib/tw";

const data = [
  { label: "AItem 1", value: "1" },
  { label: "BItem 2", value: "2" },
  { label: "CItem 3", value: "3" },
  { label: "DCItem 4", value: "4" },
  { label: "EItem 5", value: "5" },
  { label: "FItem 6", value: "6" },
  { label: "GItem 7", value: "7" },
  { label: "HItem 8", value: "8" },
];

type Data = (typeof data)[0];

export function Search() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const renderItem = (item: Data) => {
    return (
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text
          style={tw.style(
            item.value === value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  const handleClick = (item: Data) => {
    setValue(item.value);
    router.push(`/movie/${item.value}`);
  };

  return (
    <Dropdown
      style={tw`flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm`}
      containerStyle={tw`rounded-md border border-input bg-background px-3 py-2 text-sm`}
      placeholderStyle={tw`text-muted-foreground`}
      selectedTextStyle={tw`text-foreground`}
      inputSearchStyle={tw`rounded border-input text-sm bg-accent text-foreground`}
      itemContainerStyle={tw`rounded`}
      activeColor={tw.color("bg-input")}
      itemTextStyle={tw`bg-blue-100`}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Search Movie"
      searchPlaceholder="Filter by name"
      value={value}
      onChange={handleClick}
      renderItem={renderItem}
    />
  );
}
