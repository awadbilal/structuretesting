import React, { useEffect, useState } from 'react';
import { View, RefreshControl, ScrollView } from 'react-native';
import LatestProject from './LatestProject';
import ListOfProjects from './ListOfProjects';
import NoProjects from './NoProjects';
import { Text } from 'react-native-elements';
import { styles } from './style';

const Index = ({ navigation, data, user, fetchData }) => {
  const [projects, setProjects] = useState(
    Array.isArray(user.projects) && user.proejcts.length !== 0
      ? data.filter(({ id }) => user?.projects.includes(id))
      : []
  );
  const [refreshing, setRefreshing] = useState(false);

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
          <NoProjects />
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
