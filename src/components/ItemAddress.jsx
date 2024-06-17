import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/Colors";
import { ic_location, ic_placeholder } from "../assets";
import ArrowRight from "./svg/ArrowRight";
import { TitleSlice } from "../Utils";

const ItemAddress = ({ data = [], onPress = () => { } }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)} // Cập nhật ở đây
    >
      <Image source={ic_placeholder} style={styles.iconLeft} />
      <View style={styles.containerContent}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.iconRight}>
        <ArrowRight color={colors.MAIN_COLOR_CLIENT} />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default ItemAddress;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 12,
    borderRadius: 5,
    width: "98%",
  },
  containerContent: {
    width: "80%",
  },
  title: {
    color: colors.BLACK,
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
  iconRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

//   < FlatList
// data = { dataLocation }
// renderItem = {({ item }) => <ItemAddress data={item} onPress={prss} />}
// keyExtractor = {(item) => item.id}
// />
