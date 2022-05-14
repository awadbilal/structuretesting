import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Wrapper from '../Wrapper';

const StepThree = () => {
  return (
    <View style={styles.container}>
      <Wrapper />
      <Text>Step Three</Text>
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

export default StepThree;