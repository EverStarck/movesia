import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";

import tw from "@/lib/tw";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Search } from "@/components/search";

const Home = () => {
  return (
    <SafeAreaView
      style={tw.style(`flex-1`, {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-1 bg-background px-8`}
      >
        <View style={tw`flex-1 pt-1`}>
          <Search />

          <View style={tw`flex-1 justify-center`}>
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="film" />
              <EmptyPlaceholder.Title>
                Search for a movie!
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Currently, there is no movie selected.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
