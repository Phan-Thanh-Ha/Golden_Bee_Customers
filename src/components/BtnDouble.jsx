import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Spinner } from "@ui-kitten/components";

const BtnDouble = ({ isLoading1, isLoading2, title1, title2, onConfirm1, onConfirm2, btn1Visible = true, btn2Visible = true, bgColor1 = '#4CAF50', bgColor2 = '#F44336' }) => {
  return (
    <View style={styles.buttonContainer}>
      {
        btn1Visible &&
        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: bgColor1 }]} onPress={onConfirm1}>
          {isLoading1 ? <Spinner /> : <Text style={styles.buttonText}>{title1}</Text>}
        </TouchableOpacity>
      }

      {
        btn2Visible &&
        <TouchableOpacity style={[styles.cancelButton, { backgroundColor: bgColor2 }]} onPress={onConfirm2}>
          {isLoading2 ? <Spinner /> : <Text style={styles.buttonText}>{title2}</Text>}
        </TouchableOpacity>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    // backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    flex: 1,
    // backgroundColor: '#F44336',
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

export default BtnDouble;