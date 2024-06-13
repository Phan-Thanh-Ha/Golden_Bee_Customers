import { useRoute } from "@react-navigation/native";
import { Image, Text, View } from "react-native"
import MainStyles from "../../styles/MainStyle";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";
import Label from "../../components/Label";
import { dataConfrirm } from "../data";
import { ic_location } from "../../assets";
import Box from "../../components/Box";
import { TitleSlice } from "../../Utils";
import Button from "../../components/buttons/Button";

const ConfirmBooking = () => {
  const route = useRoute();
  // const { dataConfirmService } = route.params || {};
  const dataConfirmService = dataConfrirm;
  console.log("dataConfirmService in confirm booking", dataConfirmService);
  return (
    <View style={MainStyles.containerClient}>
      <LinearGradient
        colors={[colors.MAIN_COLOR_CLIENT, colors.WHITE]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text style={MainStyles.screenTitle}>Xác nhận dịch vụ</Text>
      <ScrollView>
        <View style={MainStyles.contentContainerClient}>
          <Text style={MainStyles.cardLabelConfirm}>Vị trí làm việc</Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_location}
                style={{ width: 20, height: 20 }}
              />
              <View>
                <Text style={MainStyles.cardTitleConfirm}>{TitleSlice(dataConfirmService.Address, 60)}</Text>
                <Text style={MainStyles.cardSubTitleConfirm}>{dataConfirmService.AddressDetail}</Text>
              </View>
            </View>
          </View>
          <Text style={MainStyles.cardLabelConfirm}>Thông tin công việc</Text>
          <View style={MainStyles.cardConfirmContainer}>
            <Text style={MainStyles.cardSubLabelConfirm}>Thời gian làm việc</Text>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text style={MainStyles.cardTitleConfirm}>Ngày làm việc</Text>
              <Text style={MainStyles.cardTitleConfirm}>Ngay bây giờ</Text>
            </View>
            <View style={MainStyles.flexRowFlexStart}>
              <Text style={MainStyles.cardTitleConfirm}>Làm trong : </Text>
              <Text style={MainStyles.cardTitleConfirm}>{dataConfirmService.workingTime} giờ</Text>
            </View>
            <Box height={10} />
            <Text style={MainStyles.cardSubLabelConfirm}>Chi tiết công việc</Text>
            <View style={MainStyles.flexRowSpaceBetween}>
              {
                dataConfirmService?.room && (
                  <>
                    <Text style={MainStyles.cardTitleConfirm}>Khối lượng công việc</Text>
                    <Text style={MainStyles.cardTitleConfirm}>{dataConfirmService.room} phòng/{dataConfirmService.people} nhân sự</Text>
                  </>
                )
              }
            </View>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Text style={MainStyles.cardTitleConfirm}>Loại dịch vụ</Text>
              <Text style={MainStyles.cardTitleConfirm}>{dataConfirmService.premium ? "Dịch vụ Premium" : "Dịch vụ thường"}</Text>
            </View>
          </View>
          <Text style={MainStyles.cardLabelConfirm}>Phương thức thanh tóan</Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <Button bgColor={colors.WHITE} textColor={colors.MAIN_BLUE_CLIENT} boderWidth={1}>
                Tiền mặt
              </Button>
              <Box width={10} />
              <Button >
                Chuyển khoản
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ConfirmBooking;