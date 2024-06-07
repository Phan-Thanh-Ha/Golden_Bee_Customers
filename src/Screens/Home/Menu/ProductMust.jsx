import React from "react";
import { FlatList, View, Text } from "react-native";
import { ProductLike } from "../../data";
import FastImage from "react-native-fast-image";
import { ic_star } from "../../../assets";

const ProductMust = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 10, padding: 10, alignItems: "center" }}>
        <FastImage
          style={{ width: 100, height: 100 }}
          source={
            item.image
              ? { uri: item.image }
              : { uri: "https://picsum.photos/200" }
          }
        />
        <Text>{item.header}</Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "space-around",
            width: "auto",
          }}
        >
          <View>
            <Text>{`${item.price}` + "   "}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>{item.star}</Text>
            <FastImage style={{ width: 20, height: 20 }} source={ic_star} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={ProductLike}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
    />
  );
};

export default ProductMust;
