import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './style';

const NoProjects = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={[
          styles.project,
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          },
        ]}
        onPress={() => navigation.navigate(`Projects`)}
      >
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 24,
            color: '#F7F7F7',
          }}
        >
          No projects have been initialized yet, Press here to create one now.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoProjects;
