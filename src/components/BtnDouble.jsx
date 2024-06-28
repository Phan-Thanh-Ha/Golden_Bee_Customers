import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LayoutBottom from "./layouts/LayoutBottom";
import { Spinner } from "@ui-kitten/components";

const BtnDouble = ({ isLoading1, isLoading2, title1, title2, onConfirm1, onConfirm2 }) => {
  <LayoutBottom>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirm1}>
        {isLoading1 ? <Spinner /> : <Text style={styles.buttonText}>{title1}</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onConfirm2}>
        {isLoading2 ? (
          <Spinner />
        ) : (
          <Text style={styles.buttonText}>{title2}</Text>
        )}
      </TouchableOpacity>
    </View>
  </LayoutBottom>
}
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

export default BtnDouble;