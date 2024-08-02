import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import { SCREEN_WIDTH } from "../../styles/MainStyle";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import HeaderComp from "../../components/HeaderComp";

const ServiceCarouselDetail = () => {
  const route = useRoute();
  const { article } = route?.params || {};
  // console.log("article--------------", article);
  return (
    <LayoutGradientBlue>
      <HeaderComp headerTitle={article?.NewsTitleEn} />
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <RenderHTML
          contentWidth={SCREEN_WIDTH}
          source={{ html: article?.NewsContentEn }}
          ignoredDomTags={["o:p"]}
        />
      </ScrollView>
    </LayoutGradientBlue>
  );
};

export default ServiceCarouselDetail;
