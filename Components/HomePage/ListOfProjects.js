import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import ArrowRight from 'react-native-vector-icons/AntDesign';
import { Text } from 'react-native-elements';
import { styles } from './style';

const ListOfProjects = ({ navigation, data }) => {
  return (
    <>
      <View style={styles.projectsContainer}>
        <Text style={styles.projectsHeader}>List of Projects</Text>
        <ArrowRight
          name="arrowright"
          color="#FEFEFE"
          size={20}
          onPress={() => navigation.navigate('Projects')}
        />
      </View>
      {data.slice(0, 10).map((item) => {
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
    </>
  );
};

export default ListOfProjects;
