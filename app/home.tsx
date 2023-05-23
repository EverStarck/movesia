import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

import tw from "@/lib/tw";
import { Search } from "@/components/search";

const Home = () => {
  return (
    <SafeAreaView
      style={tw.style(`flex-1`, {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <ImageBackground
        source={require("@/assets/home_background.jpg")}
        style={tw`w-full h-full bg-opacity-1`}
        resizeMode="cover"
      >
        <View
          style={tw.style("flex-1 justify-end px-8", {
            backgroundColor: "rgba(0,0,0, 0.60)",
          })}
        >
          <Text
            style={tw`text-foreground font-bold text-3xl leading-relaxed uppercase`}
          >
            Explore{"\n"}new{"\n"}treasures{"\n"}with{"\n"}each{"\n"}
            recommendation
          </Text>
          <View style={tw`mb-8 mt-10`}>
            <Search />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
