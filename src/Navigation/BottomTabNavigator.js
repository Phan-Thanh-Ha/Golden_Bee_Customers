import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
  View,
} from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import { logo_bee_blue } from "../assets";
import History from "../Screens/Home/History";
import HomeScreen from "../Screens/Home/HomeScreen";
import Welfare from "../Screens/Home/Welfare";
import Account from "../Screens/Home/Account";
import { colors } from "../styles/Colors";
import { Icon } from "@ui-kitten/components";
import { ScreenNames } from "../Constants";

export const BottomTabNavigator = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let iconName = "";
    let displayName = "";

    switch (routeName) {
      case ScreenNames.HOME:
        iconName = "home-outline";
        displayName = "Trang chủ";
        break;
      case ScreenNames.HISTORY:
        iconName = "email-outline";
        displayName = "Hoạt động";
        break;
      case ScreenNames.WELFARE:
        iconName = "gift-outline";
        displayName = "Phúc lợi";
        break;
      case ScreenNames.ACCOUNT:
        iconName = "person-outline";
        displayName = "Tài khoản";
        break;
      default:
        iconName = "home-outline";
        displayName = "Trang chủ";
    }

    return (
      <>
        <Icon
          name={iconName}
          fill={
            routeName === selectedTab
              ? colors.Lime[800]
              : colors.TEXT_COLOR_GRAY_TAB
          }
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            color:
              routeName === selectedTab
                ? colors.TEXT_COLOR_BLUE_TAB
                : colors.TEXT_COLOR_GRAY_TAB,
            fontSize: 10,
          }}
        >
          {displayName}
        </Text>
      </>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={[
          styles.tabbarItem,
          routeName === selectedTab && styles.tabbarItemSelected,
        ]}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={Platform.OS === "android" ? 55 : 80}
      circleWidth={Platform.OS === "android" ? 50 : 80}
      bgColor="white"
      initialRouteName={ScreenNames.HOME}
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <View style={styles.button}>
            <Image source={logo_bee_blue} style={styles.circleIcon} />
          </View>
        </Animated.View>
      )}
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <CurvedBottomBar.Screen
        name={ScreenNames.HOME}
        position="LEFT"
        component={() => <HomeScreen />}
      />
      <CurvedBottomBar.Screen
        name={ScreenNames.HISTORY}
        component={() => <History />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name={ScreenNames.WELFARE}
        component={() => <Welfare />}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name={ScreenNames.ACCOUNT}
        component={() => <Account />}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    bottom: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  tabbarItemSelected: {},
  icon: {
    width: 32,
    height: 32,
  },
  circleIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
