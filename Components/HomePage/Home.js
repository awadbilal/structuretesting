import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Text } from 'react-native-elements';
import { PROJECTS } from '../data';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(600).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Welcome Back!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 15,
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
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
  },
  card: {
    width: '95%',
    paddingVertical: 14,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    alignSelf: 'center',
  },
});
