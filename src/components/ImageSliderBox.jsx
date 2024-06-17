import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";

const carouselItemComp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const _renderItem = ({ item }) => {
    return (
      <View style={{ width: "100%" }}>
        <FastImage
          source={{ uri: item.url[0] }}
          style={{
            height: 130,
            borderRadius: 10,
            width: "100%",
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <Carousel
        data={dataCarousel}
        renderItem={_renderItem}
        loop={true}
        autoplay={true}
        sliderWidth={width}
        itemWidth={width - 20}
        onSnapToItem={(index) => setActiveIndex(index)}
        removeClippedSubviews
      />
      <Pagination
        dotsLength={dataCarousel.length}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingVertical: 0, marginVertical: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export const CarouselItem = React.memo(carouselItemComp);
