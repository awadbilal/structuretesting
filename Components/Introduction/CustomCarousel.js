import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import CustomPaging from './CustomPaging';

export default class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={item.picture} style={styles.logo} />
        {item.subTitle && (
          <Text h3 h3Style={styles.h3}>
            {item.subTitle}
          </Text>
        )}
        <Text h1 h1Style={styles.h1}>
          {item.title}
        </Text>
        <Text h4 h4Style={styles.h4}>
          {item.sentence}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={styles.skip}
          onPress={() => this.props.setIntro(!this.props.intro)}
        >
          Skip
        </Text>
        <Carousel
          layout={'default'}
          ref={(ref) => (this.carousel = ref)}
          data={this.props.data}
          sliderWidth={400}
          itemWidth={330}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
        <CustomPaging
          data={this.props.data}
          activeSlide={this.state.activeIndex}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 140,
    height: 140,
    marginBottom: 40,
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    color: '#FAA034',
    marginBottom: 30,
  },
  h4: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  skip: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#6E21D1',
    position: 'absolute',
    top: 80,
    right: 40,
  },
});
