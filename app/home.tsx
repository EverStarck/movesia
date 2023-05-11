import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack } from "expo-router";

import tw from "@/lib/tw";
import { EmptyPlaceholder } from "@/components/components/empty-placeholder";

const Home = () => {
  return (
    <SafeAreaView
      style={tw.style(`flex-1 bg-background`, {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`container flex-1 gap-12 items-center justify-center`}>
          <Text style={tw`text-foreground`}>Home</Text>
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="film" />
            <EmptyPlaceholder.Title>Search for a movie!</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Currently, there is no movie selected.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
