import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { styles } from './style';
import Logo from '../../../Assets/logo.png';
import GoogleIcon from 'react-native-vector-icons/FontAwesome';
import FacebookIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Register = ({ navigation, setUser }) => {
  const handleGoogle = () => {
    // Handle Google Sign in Functionality
  };

  const handleFacebook = () => {
    // Handle Facebook Sign in Functionality
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Get Started</Text>
        <Text style={[styles.subText, { marginBottom: 30 }]}>
          Log in to your account
        </Text>

        <Button
          type='solid'
          title='Sign-up using Google'
          icon={
            <GoogleIcon
              name='google'
              color='#00F0FF'
              style={{ marginRight: 20, fontSize: 22 }}
            />
          }
          iconPosition='left'
          buttonStyle={{
            backgroundColor: 'transparent',
            width: '100%',
            justifyContent: 'flex-start',
          }}
          containerStyle={styles.button}
          onPress={handleGoogle}
        />
        <Button
          type='solid'
          title='Sign-up using Facebook'
          icon={
            <FacebookIcon
              name='facebook'
              color='#00F0FF'
              style={{ marginRight: 20, fontSize: 22 }}
            />
          }
          iconPosition='left'
          buttonStyle={{
            backgroundColor: 'transparent',
            width: '100%',
            justifyContent: 'flex-start',
          }}
          containerStyle={styles.button}
          onPress={() => handleFacebook()}
        />
        <Button
          type='solid'
          title='Sign-up using E-mail'
          icon={
            <EmailIcon
              name='email-check-outline'
              color='#00F0FF'
              style={{ marginRight: 20, fontSize: 22 }}
            />
          }
          iconPosition='left'
          buttonStyle={{
            backgroundColor: 'transparent',
            width: '100%',
            justifyContent: 'flex-start',
          }}
          containerStyle={styles.button}
          onPress={() => navigation.navigate('EmailRegister')}
        />

        <Text style={[styles.subText, { marginTop: 30, alignSelf: 'center' }]}>
          Already have an account?{' '}
          <Text
            style={styles.signin}
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

export default Register;
