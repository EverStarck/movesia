import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import * as React from "react";
import { useRouter } from "expo-router";

import { Datum } from "@/types/recommend";
import tw from "@/lib/tw";

interface MovieProps extends Partial<ViewProps> {
  movie: Datum;
}

export function Movie({ movie, ...props }: MovieProps) {
  const { width } = Dimensions.get("window");
  const router = useRouter();

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          router.push(`/movie/${movie.movie_id}`);
        }}
      >
        <View
          style={{
            width: width / 3,
          }}
        >
          <Image
            source={{
              uri: movie.tmdb.data.full_path,
            }}
            resizeMode="contain"
            style={tw.style(`rounded w-full`, {
              height: width / 3 + 60,
            })}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`text-foreground text-xs`}
          >
            {movie.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
