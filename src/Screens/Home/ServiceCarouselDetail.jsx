import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import HeaderComp from "../../components/HeaderComp";
import { colors, themeColors } from "../../styles/Colors";
import ServiceCarousel from "../../components/ServiceCarousel";
import { dataNewServiceDefault } from "../data";
import { ScreenNames } from "../../Constants";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { Icon } from "@ui-kitten/components";
import Box from "../../components/Box";
import { useRef } from "react";

const ServiceCarouselDetail = () => {
  const route = useRoute();
  const { article } = route?.params || {};
  const navi = useNavigation();
  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <LayoutGradientBlue>
      <HeaderComp headerTitle={article?.NewsTitleEn} />
      <ScrollView
        style={{ flex: 1, padding: 10, backgroundColor: colors.WHITE }}
        ref={scrollViewRef}
      >
        <RenderHTML
          contentWidth={SCREEN_WIDTH}
          source={{ html: article?.NewsContentEn }}
          ignoredDomTags={["o:p"]}
        />
        <ServiceCarousel
          dataNewService={dataNewServiceDefault}
          onItemPress={(item) => {
            scrollToTop();
            navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, {
              article: item,
            });
          }}
        />
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
      <LayoutBottom>
        <TouchableOpacity
          style={[styles.button, MainStyles.flexRowCenter]}
          onPress={() => {
            Linking.openURL(`tel:${"0922277782"}`);
          }}
        >
          <Icon
            style={MainStyles.CardIcon}
            fill="#FFFFFF"
            name="phone-outline"
          />
          <Text style={styles.buttonText}>Liên hệ ngay</Text>
        </TouchableOpacity>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: themeColors.confirm,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    paddingLeft: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceCarouselDetail;
