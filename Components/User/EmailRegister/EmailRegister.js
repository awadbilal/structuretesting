import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import Logo from '../../../Assets/logo.png';
import UserIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../../../firebase';
import { styles } from './style';

const EmailRegister = ({ navigation, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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
    fetchUsers();
  }, []);

  async function handleClick() {
    // Handle Sign Up then saving the user onto firestore functionality
    setIsLoading(true);
    const filteredData = await usersList.filter(
      (user) => user?.email === formData?.email
    );
    if (filteredData.length) {
      alert('This email is already registered');
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } else {
      try {
        const docRef = await addDoc(collection(db, 'users'), formData);
        await setUser({
          ...formData,
          id: docRef.id,
        });
      } catch (e) {
        alert(e);
      }
    }
    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Get Started</Text>
        <Text style={[styles.subText, { marginBottom: 30 }]}>
          Let's create your account
        </Text>

        <Text style={styles.text}>Name</Text>
        <Input
          placeholder='John Doe'
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ color: '#FFF' }}
          inputContainerStyle={[styles.input]}
          leftIcon={
            <UserIcon
              name='user'
              color='#00F0FF'
              style={{ marginRight: 20, fontSize: 22 }}
            />
          }
        />
        <Text style={styles.text}>Email</Text>
        <Input
          placeholder='John.doe@gmail.com'
          type='email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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
            title='Get Started'
            buttonStyle={{ backgroundColor: '#3D1273' }}
            containerStyle={styles.button}
            onPress={handleClick}
          />
        )}
        <Text style={[styles.subText, { marginTop: 14, alignSelf: 'center' }]}>
          Already have an account?{' '}
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      </View>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default EmailRegister;
