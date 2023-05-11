import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useContext } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";

import tw from "@/lib/tw";
import { MoviesContext } from "@/context/movies";

const Movie = () => {
  const { id } = useSearchParams();
  const { movies, setMovies } = useContext(MoviesContext);
  console.log("here", id, movies);

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
        <Stack.Screen options={{ headerShown: false }} />

        <View style={tw`flex-1 pt-1`}>
          <Text style={tw`text-foreground`}>My Details for: {id}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
