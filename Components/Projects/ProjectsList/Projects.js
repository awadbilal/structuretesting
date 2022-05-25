import React, { useEffect } from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input, Text } from 'react-native-elements';
import { styles } from './style';

const Projects = ({ navigation, data, refreshing, setRefreshing }) => {
  const [search, setSearch] = React.useState('');
  const [projectsList, setProjectsList] = React.useState(data);

  useEffect(() => {
    setProjectsList(data?.filter((item) => item?.title?.includes(search)));
  }, [search]);

  // For refreshing the page by swiping down
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
        {projectsList?.map((item) => {
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

export default Projects;
