import { Text, View } from "react-native";
import * as React from "react";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

import moviesList from "@/lib/movies";
import tw from "@/lib/tw";

const data = moviesList;
type Data = (typeof data)[0];

export function Search() {
  const router = useRouter();
  const [value, setValue] = React.useState<string>("");

  const renderItem = (item: Data) => {
    return (
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text
          style={tw.style(
            item.value == value ? "text-foreground" : "text-muted-foreground"
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
