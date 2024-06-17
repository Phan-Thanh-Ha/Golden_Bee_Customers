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
import CheckForm from "../Screens/Service/CheckForm";
import WorkInfomationScreen from "../Screens/Service/WorkInfomationScreen";
import ServiceClearningScreen from "../Screens/Service/ServiceClearningScreen";
import ServiceHouseClearningScreen from "../Screens/Service/ServiceHouseClearningScreen";
import ServiceClearningOfficeScreen from "../Screens/Service/ServiceClearningOfficeScreen";
import ServiceClearningMachineScreen from "../Screens/Service/ServiceClearningMachineScreen";
import ServiceClearningAirScreen from "../Screens/Service/ServiceClearningAirScreen";
import ServiceRepairAirScreen from "../Screens/Service/ServiceRepairAirScreen";
import ShowMap from "../Screens/Service/ShowMap";
import ServiceRepairPipeScreen from "../Screens/Service/ServiceRepairPipeScreen";
import ServiceRepairCameraScreen from "../Screens/Service/ServiceRepairCameraScreen";
import ServiceRepairInteriorScreen from "../Screens/Service/ServiceRepairInteriorScreen";
import ConfirmBooking from "../Screens/Service/ConfirmBooking";
import WaitingStaffScreen from "../Screens/Service/WaitingStaffScreen";

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
        <MainStack.Screen name={ScreenNames.CHECK_FORM} component={CheckForm} />
        <MainStack.Screen
          name={ScreenNames.WORK_INFOMATION} //thoong tin coong vieejc
          component={WorkInfomationScreen}
        />

        <MainStack.Screen
          name={ScreenNames.FORM_CLEARNING} //giusp viec
          component={ServiceClearningScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_HOUSE_CLEARING} //don nha
          component={ServiceHouseClearningScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_OFFICE_CLEARING} //don van phong
          component={ServiceClearningOfficeScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_MACHINE_CLEANING} //ve sinh may giat
          component={ServiceClearningMachineScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_AIR_CONDITIONING} //ve sinh ddiieuf hòa ok
          component={ServiceClearningAirScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_REPAIR_AIR_CONDITIONING} //sửa ddiieuf hòa ok
          component={ServiceRepairAirScreen}
        />
        <MainStack.Screen
          name={ScreenNames.SHOW_MAP} //ve sinh ddiieuf hòa
          component={ShowMap}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_INSTALLING} //sửa oonsg nuocws ok
          component={ServiceRepairPipeScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_REPAIR_CAMERA} //sửa camera ok
          component={ServiceRepairCameraScreen}
        />
        <MainStack.Screen
          name={ScreenNames.FORM_INTERIOR} //sửa nooij thaats
          component={ServiceRepairInteriorScreen}
        />
        <MainStack.Screen
          name={ScreenNames.CONFIRM_BOOKING} //sửa xac nhan dat
          component={ConfirmBooking}
        />
        <MainStack.Screen
          name={ScreenNames.WAITING_STAFF} //sửa xac nhan dat
          component={WaitingStaffScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
