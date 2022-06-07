import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../../Assets/logo.png';
import Intro1 from '../../Assets/intro1.png';
import Intro2 from '../../Assets/intro2.png';
import Intro3 from '../../Assets/intro3.png';
import { AsyncStorage } from 'react-native';
import CustomCarousel from './CustomCarousel';

const DATA = [
  {
    title: 'Structure Testing',
    subTitle: 'Welcome to',
    sentence:
      'Where earthquake resistance testing just became easier and more accurate!',
    picture: Logo,
  },
  {
    title: 'Analytics & Statistics',
    subTitle: false,
    sentence:
      'Review and understand the statistical analysis behind your project and its simulation',
    picture: Intro1,
  },
  {
    title: 'Safe & Security',
    subTitle: false,
    sentence:
      'Secure connection between devices as well as secure login and signup',
    picture: Intro2,
  },
  {
    title: 'Keep it organized',
    subTitle: false,
    sentence:
      'All your projects are saved on the cloud, meaning you can access it anytime and anywhere',
    picture: Intro3,
  },
];

const Introduction = ({ navigation, setUser, intro, setIntro }) => {
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
        navigation.navigate('Home');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <CustomCarousel data={DATA} intro={intro} setIntro={setIntro} />
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});
