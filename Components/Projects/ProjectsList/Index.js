import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input, Text } from 'react-native-elements';
import { styles } from './style';
import { AsyncStorage } from 'react-native';

const Index = ({ navigation, data, fetchData }) => {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState([]);
  const [projectsToRender, setProjectsToRender] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const currentUser = await JSON.parse(value);
        setProjects(
          Array.isArray(currentUser.projects) &&
            currentUser.projects.length !== 0
            ? data.filter(({ id }) => currentUser?.projects.includes(id))
            : []
        );
        setProjectsToRender(
          Array.isArray(currentUser.projects) &&
            currentUser.projects.length !== 0
            ? data.filter(({ id }) => currentUser?.projects.includes(id))
            : []
        );
      }
    })();
  }, []);

  // Filtering the projects according to title
  useEffect(() => {
    if (Array.isArray(projects) && projects.length !== 0) {
      setProjectsToRender(
        projects?.filter((item) => item?.title?.includes(search))
      );
    }
  }, [search]);

  // For refreshing the page by swiping down
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
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
        <View style={styles.header}>
          <Text style={styles.title}>Projects List</Text>
          <Ionicons
            name='add'
            color='#FEFEFE'
            size={30}
            onPress={() => navigation.navigate('CreateProject')}
          />
        </View>
        <Input
          placeholder='Search Projects...'
          type='text'
          value={search}
          onChangeText={(e) => setSearch(e)}
          inputContainerStyle={styles.searchBar}
          containerStyle={{ width: '100%' }}
          leftIcon={
            <Ionicons
              name='search'
              color='#FEFEFE'
              size={20}
              style={{ marginHorizontal: 10 }}
            />
          }
        />
        {Array.isArray(projectsToRender) &&
          projectsToRender.length !== 0 &&
          projectsToRender?.map((item) => {
            return (
              <TouchableOpacity
                style={styles.project}
                key={item?.id}
                onPress={() => navigation.navigate(`${item.id}`)}
              >
                <Text style={styles.projectTitle}>{item?.title}</Text>
                <Text style={styles.projectNumbers}>{item?.levels} Levels</Text>
                <Text style={styles.projectDate}>{item?.date}</Text>
                <Text style={styles.projectNumbers}>
                  {item?.users?.length} Devices
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Index;