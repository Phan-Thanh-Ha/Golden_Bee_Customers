import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "../Constants/ScreenNames";
import SplashScreen from "../Screens/SplashScreen";
import AboutScreen from "../Screens/InforCustomers/AboutScreen";
import LoginScreen from "../Screens/InforCustomers/LoginScreen";
import RegisterScreen from "../Screens/InforCustomers/RegisterScreen";
import ActiveAccount from "../Screens/InforCustomers/ActiveAccount";
import ForgotPasswordScreen from "../Screens/InforCustomers/ForgotPasswordScreen";
import Demo from "../Screens/Demo";
import { BottomTabNavigator } from "./BottomTabNavigator";
import First from "../Screens/First";
import AuthHome from "../Screens/InforCustomers/AuthHome";
import History from "../Screens/Home/History";
import Welfare from "../Screens/Home/Welfare";
import Account from "../Screens/Home/Account";
import HomeScreen from "../Screens/Home/HomeScreen";
import AddressSearch from "../Screens/Service/AddressSearch";

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
        <MainStack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        <MainStack.Screen
          name={ScreenNames.HISTORY} //Lịch sử
          component={History}
        />
        <MainStack.Screen
          name={ScreenNames.WELFARE} //Phúc lợi
          component={Welfare}
        />
        <MainStack.Screen
          name={ScreenNames.ACCOUNT} //Tài khoản
          component={Account}
        />
        <MainStack.Screen
          name={ScreenNames.ADDRESS_SEARCH} //Tìm kiếm địa chỉ book dịch vụ
          component={AddressSearch}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
