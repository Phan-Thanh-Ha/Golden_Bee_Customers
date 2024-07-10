import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StorageNames } from "../../Constants";
import WebView from "react-native-webview";
// import { HeaderNavigation } from "../../Component";
import { getData } from "../../Utils";
import { colors } from "../../styles/Colors";
import { useSelector } from "react-redux";

export const TrainingFeedback = () => {
  const [link, setLink] = useState("");
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    // const profile = await getData(StorageNames.USER_PROFILE);
    // const userLogin = useSelector((state) => state.main.userLogin);
    // console.log(userLogin);
    // if (profile) {
    // const userProfileObject = JSON.parse(profile);
    // if (userProfileObject) {
    const linkNew = "https://crm.cak-solution.com/ovg/home?username=0943214795&password=123456";
    setLink(linkNew);
    // }
    // }
  };
  return (
    <View style={styles.container}>
      {/* <HeaderNavigation isBack txtHeader={`Phản hồi`} /> */}
      <WebView
        source={{ uri: link }}
        onError={(event) => alert(`Lỗi ${event.nativeEvent.title}`)}
        style={{
          marginTop: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
