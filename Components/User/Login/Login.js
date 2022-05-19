import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import Logo from '../../../Assets/logo.png';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import { styles } from './style';

const Login = ({ navigation, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    // Handle Login functionality
    setUser(true);
  };

  return (
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
            title='Log in'
            buttonStyle={{ backgroundColor: '#3D1273' }}
            containerStyle={styles.button}
            onPress={handleClick}
          />
        )}
        <Text style={[styles.subText, { marginTop: 14, alignSelf: 'center' }]}>
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
  );
};

export default Login;
