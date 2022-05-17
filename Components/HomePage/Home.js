import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Text } from 'react-native-elements';
import { Card } from '@rneui/themed';
import { PROJECTS } from '../data';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const DATA = PROJECTS.sort((a, b) => {
    let keyA = new Date(a.date),
      keyB = new Date(b.date);
    if (keyA < keyB) return -1;
    else if (keyB < keyA) return 1;
    else return 0;
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
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
        <Text style={styles.title}>Welcome Back!</Text>
        <TouchableOpacity style={{ width: '100%', height: '210' }}>
          <View style={styles.projectCard}>
            <Text style={styles.subText}>Your Latest Project</Text>
            <Text style={styles.projectTitle}>{DATA[0].title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  projectCard: {
    width: '100%',
    height: '100%',
    border: 2,
    borderColor: 'black',
  },
  projectTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    position: 'absolute',
    top: 60,
    left: 30,
  },
  text: {
    alignSelf: 'baseline',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 12,
  },
  subText: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 14,
    position: 'absolute',
    top: 30,
    left: 30,
    alignSelf: 'flex-start',
  },
  buttons: {
    width: '95%',
    paddingVertical: 14,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    alignSelf: 'center',
  },
});
