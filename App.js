import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from './Assets/appBackground.png';
import { StatusBar } from 'expo-status-bar';
import './firebase';

// Main Components
import Home from './Components/HomePage/Home';
import Projects from './Components/Projects/Projects';
import Scan from './Components/Scan/Scan';
import Settings from './Components/Settings/Settings';

// Introduction / Opening Components
import Introduction from './Components/Introduction/Introduction';

// User Credentials Components
import Register from './Components/User/Register';
import EmailRegister from './Components/User/EmailRegister';
import Login from './Components/User/Login';
import ResetPassword from './Components/User/ResetPassword';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  // States to check if we have a user logged in, as well as if they passed the introduction
  const [user, setUser] = React.useState(false);
  const [intro, setIntro] = React.useState(false);

  // NavigationContainer themes
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(61, 18, 115, 0.8)',
      card: 'rgba(61, 18, 115, 1)',
      background: 'transparent',
    },
  };

  // The BottomPanel is used for the navigation at the end of the screen
  const BottomPanel = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home')
              iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Projects')
              iconName = focused ? 'copy' : 'copy-outline';
            else if (route.name === 'Scan')
              iconName = focused ? 'qrcode-scan' : 'qrcode-scan';
            else if (route.name === 'Settings')
              iconName = focused ? 'settings' : 'settings-outline';

            if (iconName === 'home' || iconName === 'home-outline')
              return <Ionicons name={iconName} size={size} color={color} />;
            else if (iconName === 'copy' || iconName === 'copy-outline')
              return <Ionicons name={iconName} size={size} color={color} />;
            else if (iconName === 'qrcode-scan' || iconName === 'qrcode-scan')
              return <MaterialCI name={iconName} size={size} color={color} />;
            else if (iconName === 'settings' || iconName === 'settings-outline')
              return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2BB3E0',
          tabBarInactiveTintColor: '#FFFFFF80',
        })}
      >
        <Tab.Screen
          name='Home'
          options={{ headerShown: false }}
          component={Home}
        />
        <Tab.Screen
          name='Projects'
          options={{ headerShown: false }}
          component={Projects}
        />
        <Tab.Screen
          name='Scan'
          options={{ headerShown: false }}
          component={Scan}
        />
        <Tab.Screen
          name='Settings'
          options={{ headerShown: false }}
          component={Settings}
        />
      </Tab.Navigator>
    );
  };

  // INTRO contains all the navigation for the introduction pages.
  const INTRO = [
    <Stack.Screen name='Introduction'>
      {(props) => (
        <Introduction
          {...props}
          intro={intro}
          user={user}
          setIntro={setIntro}
        />
      )}
    </Stack.Screen>,
  ];

  // CREDENTIALS contains all the navigation for user credentials pages.
  const CREDENTIALS = [
    <Stack.Screen name='Register'>
      {(props) => <Register {...props} user={user} setUser={setUser} />}
    </Stack.Screen>,
    <Stack.Screen name='Login'>
      {(props) => <Login {...props} user={user} setUser={setUser} />}
    </Stack.Screen>,
    <Stack.Screen name='EmailRegister'>
      {(props) => <EmailRegister {...props} user={user} setUser={setUser} />}
    </Stack.Screen>,
    <Stack.Screen name='Reset'>
      {(props) => <ResetPassword {...props} user={user} setUser={setUser} />}
    </Stack.Screen>,
  ];

  return (
    <ImageBackground source={Background} style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar backgroundColor='#10A9B0' barStyle='light-content' />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user && (
            <Stack.Screen
              name='BottomPanel'
              component={BottomPanel}
              options={{ headerShown: false }}
            />
          )}
          {intro && !user && [...CREDENTIALS]}
          {!intro && !user && [...INTRO]}
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

export default App;

// The following line is to disable all warnings (Keys, depreciated packages, etc...)
console.disableYellowBox = true;
