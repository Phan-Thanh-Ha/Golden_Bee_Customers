import React from "react";
import { Text, FlatList } from "react-native";
import { colors } from "../styles/Colors";

const Label = ({
  children,
  fontSize = 15,
  color = colors.MAIN_BLUE_CLIENT,
  fontWeight = "bold",
  style = {},
  data = [],
}) => {
  console.log("-----> 👿👿👿 <-----  data:", data);
  const renderItem = ({ item }) => (
    <Text
      style={[
        {
          fontWeight: fontWeight,
          marginBottom: 5,
          color: color,
          fontSize: fontSize,
        },
        style,
      ]}
    >
      {item}
    </Text>
  );

  return (
    data.length > 0 && (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  );
};

export default Label;
