import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { styles } from './style';
import Logo from '../../../Assets/logo.png';
import UserIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';

const EmailRegister = ({ navigation, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    //   if (authUser) navigation.navigate('Home');
    // });
    // return unsubscribe;
  }, []);

  async function handleClick() {
    // Handle Sign Up then saving the user onto firestore functionality
    setUser(true);
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
