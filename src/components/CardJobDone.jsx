import React from "react";
import { View } from "react-native";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import BtnDouble from "./BtnDouble";
import Box from "./Box";
import ModalAlertSelectOption from "./modal/ModalAlertSelectOption";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { getRouterById } from "../Utils/RoutingService";
import { useSelector } from "react-redux";
import { dataMenu } from "../Screens/data";
import { PropTypes } from "prop-types";
import CardContent from "./CardContent";

const CardJobDone = ({ data }) => {
  const navi = useNavigation();
  const locationTime = useSelector((state) => state.main.locationTime);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const userLogin = useSelector((state) => state.main.userLogin);
  const useBeforeLocation = () => {
    const service = dataMenu.find((item) => item?.ServiceId === data?.ServiceId);
    navi.navigate(getRouterById(service?.ServiceId), {
      service: {
        ...service,
        Address: data?.AddressService || locationTime?.address,
        CustomerId: userLogin.Id,
        CustomerName: userLogin.CustomerName,
        Latitude: data?.LatService || locationTime?.latitude,
        Longitude: data?.LngService || locationTime?.longitude,
      },
    });
  };

  const useNewLocation = () => {
    const service = dataMenu.find(
      (item) => item?.ServiceId === data?.ServiceId
    );

    navi.navigate(ScreenNames.ADDRESS_SEARCH, {
      service: service,
    });
  };

  const handleRating = () => {
    navi.navigate(ScreenNames.RATING_SERVICE, {
      data: {
        OrderId: data?.Id,
        CustomerId: userLogin?.Id,
        ListOfficer: data?.OfficerServiceDetail,
      },
    });
  };

  return (
    <View>
      <View style={MainStyles.cardJob}>
        <View>
          <CardContent
            ServiceName={data?.ServiceName || ""}
            BookingCode={data?.BookingServiceCode || ""}
            StaffTotal={data?.TotalStaff || 0}
            TotalRoom={data?.RoomTotal || 0} // đang thiếu
            OptionName={data?.OptionName || ""} // đang thiếu
            TimeWorking={data?.TimeWorking || ""}
            OtherService={data?.DataService?.length > 0 ? data?.DataService : []}
            Voucher={data?.Voucher?.length > 0 ? data?.Voucher : []} // đang thiếu
            NoteBooking={data?.NoteBooking || ""} // đang thiếu
            CreateAtFirebase={""}
            CreateAtDatabse={data?.BookingTime || ""}
            AddressService={data?.DataService?.Address || ""}
            PriceAfterDiscount={data?.PriceAfterDiscount || 0}
            RatingNote={data?.RatingNote || ""}
            Star={data?.Star || 0}
            TotalMoney={data?.TotalMoney || 0}
          />
        </View>
        <Box height={SCREEN_HEIGHT * 0.01} />
        <BtnDouble
          title1={"Đặt lại đơn"}
          title2={"Đánh giá "}
          btn2Visible={!data?.RatingNote}
          onConfirm1={() => {
            setIsModalVisible(true);
          }}
          onConfirm2={handleRating}
        />
      </View>
      <Box height={SCREEN_HEIGHT * 0.01} />
      <ModalAlertSelectOption
        title={
          "Bạn có muốn đặt lại đơn dịch vụ này tại vị trí trước đó bạn đã đặt hay không ?"
        }
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm1={useBeforeLocation}
        onConfirm2={useNewLocation}
      />
    </View>
  );
};

CardJobDone.defaultProps = {
  data: {},
  modalRef: {},
};
CardJobDone.propTypes = {
  data: PropTypes.object,
  modalRef: PropTypes.object,
};

export default CardJobDone;
