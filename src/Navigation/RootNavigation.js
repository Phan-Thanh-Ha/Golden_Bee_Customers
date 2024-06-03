import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "../Constants/ScreenNames";
import { First } from "../Screens";
import SplashScreen from "../Screens/SplashScreen";
import AuthHome from "../Screens/auth/AuthHome";
import AboutScreen from "../Screens/auth/AboutScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import RegisterScreen from "../Screens/auth/RegisterScreen";
import ActiveAccount from "../Screens/auth/ActiveAccount";
import ForgotPasswordScreen from "../Screens/auth/ForgotPasswordScreen";
import Demo from "../Screens/Demo";
import { BottomTabNavigator } from "./BottomTabNavigator";

const MainStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
        initialRouteName={ScreenNames.FIRST}
      >
        <MainStack.Screen name={ScreenNames.DEMO} component={Demo} />
        <MainStack.Screen name={ScreenNames.FIRST} component={First} />
        <MainStack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
        <MainStack.Screen name={ScreenNames.AUTH_HOME} component={AuthHome} />
        <MainStack.Screen name={ScreenNames.ABOUT} component={AboutScreen} />
        <MainStack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        <MainStack.Screen
          name={ScreenNames.REGISTER}
          component={RegisterScreen}
        />
        <MainStack.Screen
          name={ScreenNames.ACTIVE_ACCOUNT}
          component={ActiveAccount}
        />
        <MainStack.Screen
          name={ScreenNames.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <MainStack.Screen
          name={ScreenNames.MAIN_NAVIGATOR}
          component={BottomTabNavigator}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
