import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import Logo from '../../../Assets/logo.png';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../../../firebase';
import { AsyncStorage } from 'react-native';
import { styles } from './style';

const Login = ({ navigation, setUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  // Fetching Users List
  const fetchUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const newUserArr = [];
    await usersSnapshot?.forEach((doc) => {
      newUserArr.push({ id: doc.id, ...doc.data() });
    });
    await setUsersList(newUserArr);
  };

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        navigation.navigate('Home');
      }
    })();
    fetchUsers();
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    const filteredData = await usersList?.filter(
      (user) => user.email.toLowerCase() == email.toLowerCase()
    );
    if (filteredData.length > 0) {
      if (filteredData[0].password === password) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(filteredData[0]));
        } catch (error) {
          // Error saving data
        }
        await setUser(filteredData[0]);
      } else {
        setPassword('');
        alert('Incorrect password has been entered');
      }
    } else {
      setEmail('');
      setPassword('');
      alert('This email has not been registered yet.');
    }
    setIsLoading(false);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>Continue Progressing</Text>
          <Text style={[styles.subText, { marginBottom: 30 }]}>
            Log in to your account
          </Text>
          <Text style={styles.text}>Email</Text>
          <Input
            placeholder='John.doe@gmail.com'
            type='email'
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <EmailIcon
                name='email-check-outline'
                color='#00F0FF'
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          <Text style={styles.text}>Password</Text>
          <Input
            placeholder='******************'
            secureTextEntry
            type='password'
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <PasswordIcon
                name='key'
                color='#00F0FF'
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          {isLoading ? (
            <Button
              type='solid'
              color='#3D1273'
              radius='16'
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              loading
            />
          ) : (
            <Button
              type='solid'
              radius='16'
              title='Log in'
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              onPress={handleClick}
            />
          )}
          <Text
            style={[styles.subText, { marginTop: 14, alignSelf: 'center' }]}
          >
            Forgot your password?{' '}
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate('Reset')}
            >
              Reset now
            </Text>
          </Text>
          <Text
            style={[styles.subText, { marginVertical: 6, alignSelf: 'center' }]}
          >
            or
          </Text>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Text>
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
