import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
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
import EmailRegister from './User/EmailRegister/EmailRegister';
import Login from './User/Login/Login';
import ResetPassword from './User/ResetPassword/ResetPassword';

// Projects area
import SingleProject from './Projects/SingleProjectPage/SingleProject';
import SingleProjectPart2 from './Projects/SingleProjectPart2/SingleProjectPart2';
import CreateProject from './Projects/CreateProject/CreateProject';

// Settings Area and Pages
import ProfileSettings from './Settings/Profile/Profile';
import AboutUs from './Settings/About/About';
import PrivacyPolicy from './Settings/Privacy/Privacy';
import TermsAndConditions from './Settings/Terms/Terms';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Links = ({ navigation }) => {
  // States to check if we have a user logged in, as well as if they passed the introduction
  const [user, setUser] = React.useState();
  const [intro, setIntro] = React.useState(false);
  const [projectsList, setProjectsList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  // Fetching and sorting data from Firestore
  async function fetchData() {
    // Fetching Projects List
    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    const newArr = [];
    await projectsSnapshot?.forEach((doc) => {
      if (!!user) {
        user?.projects?.forEach((pr) => {
          pr === doc?.id && newArr.push({ id: doc.id, ...doc.data() });
        });
      }
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
  }, [refreshing, user, update]);

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
              data={projectsList.slice(0, 10)}
              user={user}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
              fetchData={fetchData}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='Projects' options={{ headerShown: false }}>
          {(props) => (
            <Projects
              {...props}
              data={projectsList}
              user={user}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
              fetchData={fetchData}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='Scan' options={{ headerShown: false }}>
          {(props) => (
            <Scan
              {...props}
              user={user}
              projectsList={projectsList}
              setProjectsList={setProjectsList}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='Settings' options={{ headerShown: false }}>
          {(props) => <Settings {...props} setUser={setUser} />}
        </Tab.Screen>
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
    // <Stack.Screen name='Register'>
    //   {(props) => <Register {...props} setUser={setUser} />}
    // </Stack.Screen>,
    <Stack.Screen name='Register'>
      {(props) => <EmailRegister {...props} setUser={setUser} />}
    </Stack.Screen>,
    <Stack.Screen name='Login'>
      {(props) => <Login {...props} setUser={setUser} />}
    </Stack.Screen>,
    <Stack.Screen name='Reset'>
      {(props) => <ResetPassword {...props} user={user} setUser={setUser} />}
    </Stack.Screen>,
  ];

  // Projects contains all the navigation for View, creating, and editing projects
  const PROJECTS = [
    projectsList?.map((item) => {
      return (
        <Stack.Screen key={`${item?.id}part1`} name={`${item?.id}`}>
          {(props) => <SingleProject {...props} item={item} user={user} />}
        </Stack.Screen>
      );
    }),
    projectsList?.map((item) => {
      return (
        <Stack.Screen key={`${item?.id}part2`} name={`${item?.id}part2`}>
          {(props) => (
            <SingleProjectPart2
              {...props}
              user={user}
              item={item}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
      );
    }),
    <Stack.Screen name='CreateProject' options={{ headerShown: false }}>
      {(props) => (
        <CreateProject
          {...props}
          user={user}
          setUser={setUser}
          update={update}
          setUpdate={setUpdate}
        />
      )}
    </Stack.Screen>,
  ];

  // Settings contains all the navigation for profile settings, privacy policy, about us, terms & conditions, and Logout sections.
  const SETTINGS = [
    <Stack.Screen name='ProfileSettings'>
      {(props) => <ProfileSettings {...props} user={user} setUser={setUser} />}
    </Stack.Screen>,
    <Stack.Screen
      name='AboutUs'
      component={AboutUs}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      name='TermsAndConditions'
      component={TermsAndConditions}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      name='PrivacyPolicy'
      component={PrivacyPolicy}
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
        {user && [...PROJECTS]}
        {user && [...SETTINGS]}
        {intro && !user && [...CREDENTIALS]}
        {!intro && !user && [...INTRO]}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Links;
console.disableYellowBox = true;
