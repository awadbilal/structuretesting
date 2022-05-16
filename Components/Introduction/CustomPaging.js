import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';

export default function CustomPaging({ data, activeSlide }) {
  const settings = {
    dotsLength: data.length,
    activeDotIndex: activeSlide,
    containerStyle: styles.dotContainer,
    dotStyle: styles.dotStyle,
    inactiveDotStyle: styles.inactiveDotStyle,
    inactiveDotOpacity: 0.4,
    inactiveDotScale: 0.6,
  };
  return <Pagination {...settings} />;
}

const styles = StyleSheet.create({
  dotContainer: {
    marginBottom: 30,
  },
  dotStyle: {
    width: 7.5,
    height: 7.5,
    borderRadius: 5,
    backgroundColor: '#00F0FF',
  },
  inactiveDotStyle: {
    backgroundColor: '#B4D4CC',
  },
});
