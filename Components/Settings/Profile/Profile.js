import { View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';

const Profile = ({ navigation, user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input
          placeholder={'Profile Settings'}
          type='text'
          value={'Profile Settings'}
          style={styles.font}
          containerStyle={{ backgroundColor: 'transparent' }}
          inputStyle={{ backgroundColor: 'transparent' }}
          inputContainerStyle={styles.headerInput}
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
      <Text style={styles.text}>Name</Text>
      <Input
        placeholder='John Doe'
        type='text'
        value={user?.name}
        disabledInputStyle={{ color: '#FFF' }}
        style={{ color: '#FFF' }}
        inputContainerStyle={[styles.input]}
        leftIcon={
          <UserIcon
            name='user'
            color='#00F0FF'
            style={{ marginRight: 20, fontSize: 22 }}
          />
        }
        disabled={true}
      />
      <Text style={styles.text}>Email</Text>
      <Input
        placeholder='John.doe@gmail.com'
        type='email'
        value={user?.email}
        disabledInputStyle={{ color: '#FFF' }}
        style={{ color: '#FFF' }}
        inputContainerStyle={[styles.input]}
        leftIcon={
          <EmailIcon
            name='email-check-outline'
            color='#00F0FF'
            style={{ marginRight: 20, fontSize: 22 }}
          />
        }
        disabled={true}
      />
      <Text style={[styles.subText, { marginTop: 14, alignSelf: 'center' }]}>
        Forgot your password?{' '}
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate('Reset')}
        >
          Reset now
        </Text>
      </Text>
    </View>
  );
};

export default Profile;
