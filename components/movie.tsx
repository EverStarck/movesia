import {
  Dimensions,
  FlatList,
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import * as React from "react";
import ReadMore from "@fawazahmed/react-native-read-more";
import { Link } from "expo-router";

import { Datum } from "@/types/recommend";
import tw from "@/lib/tw";
import { MoviesContext } from "@/context/movies";
import { Icons } from "@/components/icons";
import { Poster } from "@/components/poster";

interface MovieProps extends Partial<ViewProps> {
  movie: Datum;
}

export function Movie({ movie, ...props }: MovieProps) {
  const { width } = Dimensions.get("window");
  console.log("🚀 ~ file: movie.tsx:23 ~ Movie ~ movie:", movie);
  //   const { movies } = React.useContext(MoviesContext);
  //   console.log("🚀 ~ file: poster.tsx:16 ~ Poster ~ movies:", movies);
  //   const movie = movies[id];
  //   console.log("🚀 ~ file: poster.tsx:15 ~ Poster ~ movie:", movie);

  return (
    <View style={tw`flex-row bg-myRed`}>
      <TouchableWithoutFeedback>
        <View>
          <Image
            source={{
              uri: movie.tmdb.data.full_path,
            }}
            resizeMode="contain"
            style={{
              width: width / 3,
              height: width / 3 + 60,
            }}
            //   style={tw`w-full h-full`}
          />
          <Text style={tw`text-foreground`}>{movie.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
