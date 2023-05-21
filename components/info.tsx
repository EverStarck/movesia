import {
  FlatList,
  GestureResponderEvent,
  Text,
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
import { Movie } from "@/components/movie";
import { Poster } from "@/components/poster";

interface InfoProps extends Partial<ViewProps> {
  id: string;
}

export function Info({ id, ...props }: InfoProps) {
  const { movies } = React.useContext(MoviesContext);
  console.log("🚀 ~ file: poster.tsx:16 ~ Poster ~ movies:", movies);
  const movie = movies[id];
  console.log("🚀 ~ file: poster.tsx:15 ~ Poster ~ movie:", movie);

  const renderItem = ({ item }: { item: Datum }) => {
    if (item.movie_id === Number(id)) return;

    return <Movie movie={item} />;
  };

  return (
    <View
      style={tw.style("flex-1 flex-column gap-2 px-8", {
        marginTop: -50,
      })}
    >
      <Text style={tw`text-foreground text-xl font-semibold`}>About</Text>

      <ReadMore
        numberOfLines={3}
        style={tw`text-muted-foreground`}
        seeMoreText="Read More"
        seeMoreStyle={tw`text-myRed`}
        seeLessText="Read Less"
        seeLessStyle={tw`text-myRed`}
      >
        {movie.tmdb.data.overview}
      </ReadMore>

      <View style={tw`mt-8`}>
        <Text style={tw`text-foreground text-xl font-semibold`}>
          Similar Movies
        </Text>
        <FlatList
          // This is getting all the state movies and not only the ones that are similar
          data={Object.values(movies)}
          keyExtractor={(item) => String(item.movie_id)}
          renderItem={renderItem}
          horizontal
        />
      </View>
    </View>
  );
}
