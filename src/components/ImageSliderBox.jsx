import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import { colors } from "../styles/Colors";

const carouselItemComp = () => {
  const dataCarousel = [
    {
      id: 1,
      url: [
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      ],
    },
    {
      id: 2,
      url: [
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      ],
    },
    {
      id: 3,
      url: [
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      ],
    },
    {
      id: 4,
      url: [
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      ],
    },
    {
      id: 5,
      url: [
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fapi-crmcak.vps.vn%2Fupload%2F%2Fongvangvietnam.com%2F2024%2F062024%2F05%2F_2024-06-05-03-17-55_1.jpg&w=3840&q=100",
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fapi-crmcak.vps.vn%2Fupload%2F%2Fongvangvietnam.com%2F2024%2F062024%2F05%2F_2024-06-05-03-17-55_1.jpg&w=3840&q=100",
      ],
    },
    {
      id: 6,
      url: [
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
        "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      ],
    },
  ];
  const width = Dimensions.get("window").width;
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          // flexDirection: "row",
          marginVertical: 14,
          width: "100%",
        }}
      >
        <FastImage source={{ uri: item.url[0] }} style={{ height: 130 }} />
      </View>
    );
  };
  return (
    <View
      style={{
        borderWidth: 0.3,
        // marginHorizontal: 18,
        borderRadius: 10,
        // borderColor: colors.DIM_GRAY,
        // justifyContent: "center",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
      }}
    >
      <Carousel
        data={dataCarousel}
        renderItem={_renderItem}
        loop={true}
        autoplay={true}
        sliderWidth={380}
        itemWidth={width - 10}
        dotsLength={dataCarousel.length}
        activeDotIndex={0}
        activeOpacity={0.9}
      />
    </View>
  );
};

export const CarouselItem = React.memo(carouselItemComp);
