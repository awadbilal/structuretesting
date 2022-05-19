import React from 'react';
import { View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import CustomPaging from './CustomPaging';
import { styles } from './style';

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
