import { Image, StyleSheet, Text, View } from "react-native";
import { ic_location, ic_placeholder } from "../assets";
import { TitleSlice } from "../Utils";
import { colors } from "../styles/Colors";

export const CardLocation = ({ location }) => {
  return (
    <View style={styles.container}>
      <Image
        source={ic_location}
        style={styles.iconLeft}
      />
      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {location}
        </Text>
      </View>
    </View>
  );
};
export default CardLocation;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5
  },
  containerContent: {
  },
  title: {
    color: colors.BLACK,
    paddingRight: 22,
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
})