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
import GoogleIcon from 'react-native-vector-icons/FontAwesome';
import FacebookIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Register = ({ navigation }) => {
  const handleGoogle = () => {
    // const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider);
    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  const handleFacebook = () => {};

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
          <Text style={styles.title}>Get Started</Text>
          <Text style={[styles.subText, { marginBottom: 30 }]}>
            Log in to your account
          </Text>

          <Button
            type="solid"
            title="Sign-up using Google"
            icon={
              <GoogleIcon
                name="google"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
            iconPosition="left"
            buttonStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              justifyContent: 'flex-start',
            }}
            containerStyle={styles.button}
            onPress={handleGoogle}
          />
          <Button
            type="solid"
            title="Sign-up using Facebook"
            icon={
              <FacebookIcon
                name="facebook"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
            iconPosition="left"
            buttonStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              justifyContent: 'flex-start',
            }}
            containerStyle={styles.button}
            onPress={() => handleFacebook()}
          />
          <Button
            type="solid"
            title="Sign-up using E-mail"
            icon={
              <EmailIcon
                name="email-check-outline"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
            iconPosition="left"
            buttonStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              justifyContent: 'flex-start',
            }}
            containerStyle={styles.button}
            onPress={() => navigation.navigate('EmailRegister')}
          />

          <Text
            style={[styles.subText, { marginTop: 30, alignSelf: 'center' }]}
          >
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
    marginTop: 10,
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
  button: {
    width: '95%',
    fontSize: 12,
    paddingVertical: 10,
    paddingLeft: 18,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
    marginTop: 30,
  },
  signin: {
    fontWeight: '700',
    color: '#00F0FF',
    fontSize: 14,
    borderBottomColor: '#00F0FF',
    paddingBottom: 1,
    borderBottomWidth: 1,
  },
});

export default Register;
