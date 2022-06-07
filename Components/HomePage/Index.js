import React, { useEffect, useState } from 'react';
import { View, RefreshControl, ScrollView } from 'react-native';
import LatestProject from './LatestProject';
import ListOfProjects from './ListOfProjects';
import NoProjects from './NoProjects';
import { Text } from 'react-native-elements';
import { styles } from './style';
import { AsyncStorage } from 'react-native';

const Index = ({ navigation, data, fetchData }) => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
        const currentUser = await JSON.parse(value);
        setProjects(
          Array.isArray(currentUser.projects) &&
            currentUser.projects.length !== 0
            ? data.filter(({ id }) => currentUser?.projects.includes(id))
            : []
        );
      }
    })();
  }, []);

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
        <Text style={[styles.title, { marginLeft: 50 }]}>{user?.name}</Text>
        {Array.isArray(projects) && projects.length !== 0 ? (
          <>
            <LatestProject data={projects[0]} navigation={navigation} />
            <ListOfProjects data={projects} navigation={navigation} />
          </>
        ) : (
          <NoProjects navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
