import React from 'react';
import { View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './style';

const RecordData = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: '80%' }}>
          <Input
            placeholder=''
            type='text'
            value=''
            containerStyle={{ backgroundColor: 'transparent' }}
            inputStyle={{ backgroundColor: 'transparent' }}
            inputContainerStyle={styles.input}
            leftIcon={
              <AntDesign
                name='arrowleft'
                color='#F7F7F7'
                size={20}
                style={{ marginRight: 10 }}
                onPress={() => navigation.goBack()}
              />
            }
            disabled={true}
          />
        </View>
      </View>
    </View>
  );
};

export default RecordData;
