import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Wrapper = ({ data }) => {
  return (
    <ImageBackground
      source={Background}
      style={{ width: '100%', height: '100%' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>{data}</View></KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  }
});
