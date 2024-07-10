import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../../Constants";
import { getIconById } from "../../../Utils/RoutingService";
import { SCREEN_WIDTH } from "../../../styles/MainStyle";
import { themeColors } from "../../../styles/Colors";

const ITEMS_PER_PAGE = 6; // 3 items per row, 2 rows

export const MenuScroll = () => {
  const data = useSelector((state) => state.main.menuService);
  const navi = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const numPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleScroll = (event) => {
    const pageIndex = Math.floor(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setCurrentPage(pageIndex);
  };

  const getPagedData = (pageIndex) => {
    const startIndex = pageIndex * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {Array.from({ length: numPages }).map((_, pageIndex) => (
          <View key={pageIndex} style={styles.page}>
            {getPagedData(pageIndex).map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  navi.navigate(ScreenNames.ADDRESS_SEARCH, {
                    service: item,
                  });
                }}
                style={styles.itemContainer}
              >
                <FastImage
                  style={styles.image}
                  source={
                    getIconById(item.ServiceId)
                      ? getIconById(item.ServiceId)
                      : { uri: "https://picsum.photos/200" }
                  }
                />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.ServiceName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {Array.from({ length: numPages }).map((_, index) => (
          <Text
            key={index}
            style={[
              styles.paginationDot,
              { opacity: currentPage === index ? 1 : 0.5 },
            ]}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.lightBackground,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: SCREEN_WIDTH,
  },
  itemContainer: {
    width: SCREEN_WIDTH * 0.3,
    alignItems: "center",
    marginTop: 15,
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    textAlign: "center",
    width: SCREEN_WIDTH * 0.25,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    fontSize: 16,
    marginHorizontal: 5,
    color: themeColors.primary,
  },
});
