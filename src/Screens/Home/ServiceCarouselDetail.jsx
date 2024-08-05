import { useNavigation, useRoute } from "@react-navigation/native"
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import HeaderComp from "../../components/HeaderComp";
import { colors, themeColors } from "../../styles/Colors";
import ServiceCarousel from "../../components/ServiceCarousel";
import { dataNewServiceDefault } from "../data";
import { ScreenNames } from "../../Constants";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { Icon } from "@ui-kitten/components";
import Box from "../../components/Box";
import { useSelector } from "react-redux";

const ServiceCarouselDetail = () => {
  const route = useRoute();
  const { article } = route?.params || {};
  const navi = useNavigation();
  const menu = useSelector((state) => state.main.menuService);

  const handleBooking = () => {
    if (article?.ServiceId) {
      const service = menu.find((item) => item?.ServiceId === article?.ServiceId);
      navi.navigate(ScreenNames.ADDRESS_SEARCH, {
        service: service,
      });
    } else {
      const service = menu.find((item) => item?.ServiceId === 7);
      navi.navigate(ScreenNames.ADDRESS_SEARCH, {
        service: service,
      });
    }
  }
  return (
    <LayoutGradientBlue>
      <HeaderComp headerTitle={article?.NewsTitleEn} />
      <ScrollView style={{ flex: 1, padding: 10, backgroundColor: colors.WHITE }}>
        <RenderHTML
          contentWidth={SCREEN_WIDTH}
          source={{ html: article?.NewsContentEn }}
          ignoredDomTags={["o:p"]}
        />
        <ServiceCarousel
          dataNewService={dataNewServiceDefault}
          onItemPress={(item) => {
            navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, { article: item });
          }}
        />
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
      <LayoutBottom>
        <TouchableOpacity style={[styles.button, MainStyles.flexRowCenter]} onPress={handleBooking}>
          <Icon
            style={MainStyles.CardIcon}
            fill="#FFFFFF"
            name="plus-outline"
          />
          <Text style={styles.buttonText}>Đặt dịch vụ ngay</Text>
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
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ServiceCarouselDetail;
