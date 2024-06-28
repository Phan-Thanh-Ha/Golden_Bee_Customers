import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { ic_human, logo_bee_blue } from "../../assets";
import Rating from "../../components/Rating";
import { useState } from "react";
import RatingTouch from "../../components/RatingTouch";
import Label from "../../components/Label";
import TextArea from "../../components/TextArea";
import MainStyles from "../../styles/MainStyle";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { ScreenNames } from "../../Constants";
import { Spinner } from "@ui-kitten/components";


const RatingServiceScreen = () => {
  const route = useRoute();
  const { data } = route.params || {};
  const navi = useNavigation();
  console.log("data service remove on rating service", data);
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onGoToHome = () => {
    navi.navigate(ScreenNames.MAIN_NAVIGATOR);
  }
  const onSubmitRating = () => {

  }
  return (
    <View style={MainStyles.containerClient}>
      <LayoutGradientBlue>
        <View style={{ padding: 20 }}>
          <View>
            {
              data?.StaffAvt ? (
                <Image
                  source={ic_human}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                />
              ) : (
                <Image
                  source={ic_human}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                />
              )
            }
          </View>
          <Text style={MainStyles.title_1}>Đánh giá dịch vụ nhân viên</Text>
          <Text style={MainStyles.subtitle_1}>Bạn thấy dịch vụ của từ nhân viên {data?.StaffName} như thế nào ? hãy để lại đánh giá để ong vàng biết nhé</Text>
          <View style={[MainStyles.flexRowCenter, { marginTop: 20 }]}>
            <RatingTouch rating={rating} fontSize={[30, 30]} onRate={setRating} />
          </View>
          <Label>Ghi chú</Label>
          <TextArea
            style={{ height: 200 }}
            placeholder="Để lại lời nhắn cho ong vàng"
            value={note}
            onChangeText={(value) => setNote(value)}
          />
        </View>
        <LayoutBottom>
          <View style={styles.buttonContainer}>
            {
              isSubmit ? (
                null
              ) : (
                <TouchableOpacity style={styles.confirmButton} onPress={onSubmitRating}>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Text style={styles.buttonText}>Gửi đánh giá</Text>
                  )}
                </TouchableOpacity>
              )
            }

            <TouchableOpacity style={styles.cancelButton} onPress={onGoToHome}>
              <Text style={styles.buttonText}>Về trang chính</Text>
            </TouchableOpacity>
          </View>
        </LayoutBottom>
      </LayoutGradientBlue>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default RatingServiceScreen;