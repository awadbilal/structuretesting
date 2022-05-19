import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../firebase';

// Main Components
import Home from './HomePage/Home';
import Projects from './Projects/ProjectsList/Projects';
import Scan from './Scan/Scan';
import Settings from './Settings/Settings';

// Introduction / Opening Components
import Introduction from './Introduction/Introduction';

// User Credentials Components
import Register from './User/Register/Register';
import EmailRegister from './User/EmailRegister/EmailRegister';
import Login from './User/Login/Login';
import ResetPassword from './User/ResetPassword/ResetPassword';

// Projects area
import SingleProject from './Projects/SingleProjectPage/SingleProject';
import CreateProject from './Projects/CreateProject/CreateProject';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Links = ({ navigation }) => {
  // States to check if we have a user logged in, as well as if they passed the introduction
  const [user, setUser] = React.useState(true);
  const [intro, setIntro] = React.useState(false);
  const [projectsList, setProjectsList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // Fetching and sorting data from Firestore
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const newArr = [];
    await querySnapshot?.forEach((doc) => {
      newArr.push({ id: doc.id, ...doc.data() });
    });
    newArr.sort((a, b) => {
      let keyA = new Date(a.date),
        keyB = new Date(b.date);
      if (keyA < keyB) return -1;
      else if (keyB < keyA) return 1;
      else return 0;
    });
    await setProjectsList(newArr);
  }

  React.useEffect(() => {
    fetchData();
  }, [refreshing]);

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
        <Tab.Screen name='Home' options={{ headerShown: false }}>
          {(props) => (
            <Home
              {...props}
              projectsList={projectsList.slice(0, 10)}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='Projects' options={{ headerShown: false }}>
          {(props) => (
            <Projects
              {...props}
              projectsList={projectsList}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
            />
          )}
        </Tab.Screen>
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

  // Projects contains all the navigation for View, creating, and editing projects
  const PROJECTS = [
    projectsList?.map((item) => {
      return (
        <Stack.Screen key={item?.id} name={`${item?.id}`}>
          {(props) => <SingleProject {...props} data={item} />}
        </Stack.Screen>
      );
    }),
    <Stack.Screen
      name='CreateProject'
      component={CreateProject}
      options={{ headerShown: false }}
    />,
  ];

  return (
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
        {user && PROJECTS}
        {intro && !user && [...CREDENTIALS]}
        {!intro && !user && [...INTRO]}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Links;
LogBox.disableYellowBox = true;
console.disableYellowBox = true;
