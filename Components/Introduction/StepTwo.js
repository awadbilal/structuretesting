import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Wrapper from '../Wrapper';

const StepTwo = () => {
  return (
    <View style={styles.container}>
      <Wrapper />
      <Text>Step Two</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  }
});

export default StepTwo;