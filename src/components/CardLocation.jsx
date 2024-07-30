import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ic_location, ic_placeholder } from "../assets";
import { colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "../styles/MainStyle";

export const CardLocation = ({ location }) => {
  const navi = useNavigation();
  return (
    <TouchableOpacity
      // onPress={() => {
      //   // navi.goBack();
      // }}
      style={styles.container}
    >
      <Image source={ic_location} style={styles.iconLeft} />
      <View style={styles.containerContent}>
        <Text style={styles.title}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default CardLocation;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    minWidth: SCREEN_WIDTH * 0.95
  },
  containerContent: {},
  title: {
    color: colors.BLACK,
    paddingRight: 25,
    fontSize: 16,
  },
  subTitle: {
    color: colors.GRAY,
    fontSize: 13,
  },
  iconLeft: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});
