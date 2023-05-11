import { Text, TextProps, View, ViewProps } from "react-native";
import * as React from "react";

import tw from "@/lib/tw";
import { Icons } from "@/components/icons";

interface EmptyPlaceholderProps extends Partial<ViewProps> {}

export function EmptyPlaceholder({
  children,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <View
      style={tw`flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed border-border p-8 text-center`}
      {...props}
    >
      <View
        style={tw`mx-auto flex max-w-[420px] flex-col items-center justify-center text-center`}
      >
        {children}
      </View>
    </View>
  );
}

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  ...props
}: EmptyPlaceholderIconProps) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <View
      style={tw`flex h-20 w-20 items-center justify-center rounded-full bg-muted`}
    >
      <Icon
        style={tw`h-10 w-10`}
        color={tw.color("bg-muted-foreground")}
        {...props}
      />
    </View>
  );
};

interface EmptyPlacholderTitleProps extends Partial<TextProps> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  ...props
}: EmptyPlacholderTitleProps) {
  return <Text style={tw`mt-6 text-xl font-semibold text-foreground`} {...props}></Text>;
};

interface EmptyPlacholderDescriptionProps extends Partial<TextProps> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  ...props
}: EmptyPlacholderDescriptionProps) {
  return (
    <Text
      style={tw`mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground`}
      {...props}
    ></Text>
  );
};
