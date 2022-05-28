import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import ImageGradient from '../../Assets/imageGradiant.png';
import Chart1 from '../../Assets/chart1.png';
import Chart2 from '../../Assets/chart2.png';
import { Linechart } from '../Projects/Charts/Charts';
import { Image } from '@rneui/themed';
import { ref, getDownloadURL } from 'firebase/storage';
import { store } from '../../firebase';
import { styles } from './style';

const LatestProject = ({ data }) => {
  // Fetching the image for the project
  const [url, setUrl] = React.useState();

  async function fetchImage() {
    const reference = await ref(store, `/${data?.image}`);
    await getDownloadURL(reference)
      .then((data) => setUrl(data))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    data?.image && fetchImage();
  }, []);

  return (
    <>
      <View style={styles.latestProject}>
        {data?.image && (
          <ImageBackground
            source={{ uri: url }}
            style={styles.latestGradient}
          />
        )}
        <ImageBackground source={ImageGradient} style={styles.latestGradient} />
        <Text style={styles.latestSub}>Your Latest Project</Text>
        <Text style={styles.latestTitle}>{data?.title}</Text>
      </View>
      <View style={styles.chartsContainer}>
        <View style={styles.chartArea}>
          <Linechart
            info={data?.users[0]?.levels[0]?.gyroscope}
            height={150}
            width={150}
            decimalPlaces={1}
            dotSize="1"
          />
        </View>
        <View style={styles.chartArea}>
          <Linechart
            info={data?.users[0]?.levels[0]?.accelerometer}
            height={150}
            width={150}
            decimalPlaces={1}
            dotSize="1"
          />
        </View>
      </View>
    </>
  );
};

export default LatestProject;
