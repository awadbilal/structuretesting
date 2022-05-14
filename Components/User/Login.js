import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import Logo from '../../Assets/logo.png';
import Background from '../../Assets/BackgroundappBackground.png';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <ImageBackground
      source={Background}
      style={{ width: '100%', height: '100%' }}
    >
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
          <Text
            style={[styles.subText, { marginTop: 14, alignSelf: 'center' }]}
          >
            Forgot your password?{' '}
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate('ResetPassword')}
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
        <View style={{height: 100}} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 40,
  },
  text: {
    alignSelf: 'baseline',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 12,
  },
  title: {
    color: '#3D1273',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'center',
  },
  subText: {
    color: '#FFF',
    fontSize: 12,
    alignSelf: 'center',
  },
  input: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  button: {
    width: '95%',
    paddingVertical: 14,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    alignSelf: 'center',
  },
  signup: {
    fontWeight: '700',
    color: '#00F0FF',
    fontSize: 14,
    borderBottomColor: '#00F0FF',
    paddingBottom: 1,
    borderBottomWidth: 1,
  },
});

export default Login;
