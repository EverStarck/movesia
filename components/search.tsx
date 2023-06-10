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
            item.value == value
              ? "text-foreground font-semibold"
              : "text-foreground"
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
      style={tw.style(
        `flex w-full rounded-md border border-foreground px-3 py-2 text-sm`,
        { backgroundColor: "rgba(0,0,0, 0.65)" }
      )}
      containerStyle={tw`rounded-md border border-foreground bg-background px-3 py-2 text-sm mb-14`}
      placeholderStyle={tw`text-foreground`}
      selectedTextStyle={tw`text-foreground`}
      inputSearchStyle={tw`rounded border-foreground text-sm bg-accent text-foreground`}
      itemContainerStyle={tw`rounded`}
      activeColor={tw.color("bg-input")}
      itemTextStyle={tw`bg-blue-100`}
      data={data}
      search
      maxHeight={500}
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
