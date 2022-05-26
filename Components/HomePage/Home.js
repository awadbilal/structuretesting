import React from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ArrowRight from 'react-native-vector-icons/AntDesign';
import { Text } from 'react-native-elements';
import ImageGradient from '../../Assets/imageGradiant.png';
import Chart1 from '../../Assets/chart1.png';
import Chart2 from '../../Assets/chart2.png';
import { Image } from '@rneui/themed';
import { ref, getDownloadURL } from 'firebase/storage';
import { store } from '../../firebase';
import { styles } from './style';

const Home = ({ navigation, data, refreshing, setRefreshing, fetchData }) => {
  const [projectsList, setProjectsList] = React.useState(data);

  async function editList() {
    setProjectsList(projectsList);
  }

  // Fetching the image for the project
  const [url, setUrl] = React.useState();

  async function fetchImage() {
    const reference = await ref(store, `/${projectsList[0]?.image}`);
    await getDownloadURL(reference)
      .then((data) => setUrl(data))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    editList();
    fetchImage();
  }, []);

  // Refreshing the page by scrolling down
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(600).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.latestProject}>
          <ImageBackground
            source={{ uri: url }}
            style={styles.latestGradient}
          />
          <ImageBackground
            source={ImageGradient}
            style={styles.latestGradient}
          />
          <Text style={styles.latestSub}>Your Latest Project</Text>
          <Text style={styles.latestTitle}>{projectsList[0]?.title}</Text>
        </View>
        <View style={styles.chartsContainer}>
          <View style={styles.chartArea}>
            <Image source={Chart1} containerStyle={styles.chartImage} />
          </View>
          <View style={styles.chartArea}>
            <Image source={Chart2} containerStyle={styles.chartImage} />
          </View>
        </View>
        <View style={styles.projectsContainer}>
          <Text style={styles.projectsHeader}>List of Projects</Text>
          <ArrowRight
            name="arrowright"
            color="#FEFEFE"
            size={20}
            onPress={() => navigation.navigate('Projects')}
          />
        </View>
        {projectsList?.map((item) => {
          return (
            <TouchableOpacity
              style={styles.project}
              key={item.id}
              onPress={() => navigation.navigate(`${item.id}`)}
            >
              <Text style={styles.projectTitle}>{item.title}</Text>
              <Text style={styles.projectDate}>{item.date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Home;
