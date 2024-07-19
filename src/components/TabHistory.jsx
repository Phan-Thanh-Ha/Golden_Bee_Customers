import { dataJobDone } from "../Screens/data";
import CardJobDone from "./CardJobDone";
import { FlatList, StyleSheet } from "react-native";
import CardDefault from "./CardDefault";

const TabHistory = ({ modalJobDoneRef }) => {
  // const userLogin = useSelector((state) => state.main.userLogin);
  // const [dataJobDone, setDataJobDone] = useState([]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     OVG_spOfficer_Booking_Done();
  //   }, [])
  // );
  // const OVG_spOfficer_Booking_Done = async () => {
  //   try {
  //     const pr = {
  //       CustomerId: userLogin.Id,
  //       GroupUserId: GroupUserId,
  //     };
  //     const params = {
  //       Json: JSON.stringify(pr),
  //       func: "OVG_spOfficer_Booking_Done",
  //     };

  //     const result = await mainAction.API_spCallServer(params, dispatch);
  //     if (result) {
  //       setDataJobDone(result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    dataJobDone?.length > 0 ? (
      <FlatList
        style={styles.flatList}
        data={dataJobDone}
        renderItem={({ item }) => (
          <CardJobDone data={item} modalRef={modalJobDoneRef} />
        )}
        keyExtractor={(item) => item?.BookingServiceCode}
      />
    ) : (
      <CardDefault title={"Chưa có dịch vụ đã đặt"} />
    )
  );
}
const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default TabHistory;