import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import { colors, themeColors } from "../styles/Colors";
import { useSelector } from "react-redux";
import { logo_bee_blue } from "../assets";
import IconWithAnimatedBadge from "./IconWithBadge";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import BtnDouble from "./BtnDouble";

const UserHeader = ({ totalService = 0 }) => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const navi = useNavigation();
  return (
    userLogin ? (
      <View style={styles.container}>
        <View style={[MainStyles.flexRowSpaceBetween]}>
          <View style={MainStyles.flexRow}>
            <Image
              source={logo_bee_blue}
              style={{
                width: SCREEN_WIDTH * 0.11,
                height: SCREEN_WIDTH * 0.11,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
            <View>
              <Text style={styles.title}>Chào {userLogin?.CustomerName},</Text>
              <Text style={styles.subTitle}>Cùng làm việc nhé !</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => { navi.navigate(ScreenNames.HISTORY) }}>
            <View style={styles.main}>
              <IconWithAnimatedBadge name="shopping-cart" badgeCount={totalService} animation="bounce" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : null
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SCREEN_HEIGHT * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.04,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: themeColors.lightBackground,
    // backgroundColor: colors.summer[200],
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: themeColors.primary
  },
  subTitle: {
    fontSize: 13,
    color: themeColors.primaryText
  }
})
export default UserHeader;