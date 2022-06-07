import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Legend = () => {
  return (
    <View style={styles.legend}>
      <Text style={[styles.legendTitle, { color: '#FEFEFE' }]}>
        Legend: &nbsp;&nbsp;{' '}
      </Text>
      <Text style={[styles.legendTitle, { color: '#FA3003' }]}>
        ◉ X &nbsp;&nbsp;&nbsp;
      </Text>
      <Text style={[styles.legendTitle, { color: '#10A9B0' }]}>
        ◉ Y &nbsp;&nbsp;&nbsp;
      </Text>
      <Text style={[styles.legendTitle, { color: '#F7931A' }]}>
        ◉ Z &nbsp;&nbsp;&nbsp;
      </Text>
    </View>
  );
};

export default Legend;

const styles = StyleSheet.create({
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 12,
  },
  legendTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
