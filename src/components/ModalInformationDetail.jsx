import React, { useRef, useEffect } from 'react';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Box from './Box';

const ModalInformationDetail = ({ children, isOpen, onClose, snapPoints, initialIndex, onChange }) => {
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current.present();
    } else {
      bottomSheetModalRef.current.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={initialIndex}
        snapPoints={snapPoints}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} pressBehavior="close" />}
        onChange={onChange}
        onClose={onClose}
      >
        <View style={[styles.contentContainer]}>
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" fill="black" style={styles.icon} />
          </TouchableOpacity> */}
          <ScrollView>
            {children}
            <Box height={70} />
          </ScrollView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ModalInformationDetail;
