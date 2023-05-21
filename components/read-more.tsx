import { Text, TouchableWithoutFeedback } from "react-native";
import * as React from "react";

import tw from "@/lib/tw";

export function MoreLessComponent({
  truncatedText,
  fullText,
}: {
  truncatedText: string;
  fullText: string;
}) {
  const [more, setMore] = React.useState(false);
  return (
    <Text style={tw`text-muted-foreground`}>
      {!more ? `${truncatedText}...` : fullText}
      <TouchableWithoutFeedback onPress={() => setMore(!more)}>
        <Text style={tw`text-myRed`}>{more ? " Show Less" : " Show More"}</Text>
      </TouchableWithoutFeedback>
    </Text>
  );
}
