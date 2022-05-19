import React, { useEffect } from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input, Text } from 'react-native-elements';
import { Image } from '@rneui/themed';
import { ref, getDownloadURL } from 'firebase/storage';
import { store } from '../../../firebase';
import { styles } from './style';

const Projects = ({ navigation, projectsList, refreshing, setRefreshing }) => {
  const [search, setSearch] = React.useState('');
  const [projects, setProjects] = React.useState(projectsList);

  useEffect(() => {
    setProjects(projectsList.filter((item) => item?.title?.includes(search)));
  }, [search]);

  // For refreshing the page by swiping down
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(600).then(() => setRefreshing(false));
  }, []);

  const handleClick = (item) => {
    navigation.navigate(`${item}`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Project List</Text>
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
          onChange={(e) => setSearch(e.target.value)}
          inputContainerStyle={styles.searchBar}
          containerStyle={{ width: '100%' }}
          leftIcon={
            <Ionicons
              name='search'
              color='#FEFEFE'
              size={20}
              style={{ marginRight: 10, marginLeft: 10 }}
            />
          }
        />
        {projects?.map((item) => {
          return (
            <TouchableOpacity
              style={styles.project}
              key={item.id}
              onPress={() => handleClick(item.id)}
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

export default Projects;
