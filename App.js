import * as React from 'react';
import { ImageBackground } from 'react-native';
import Background from './Assets/appBackground.png';
import './firebase';

import Links from './Components/Links';

const App = () => {
  return (
    <ImageBackground source={Background} style={{ flex: 1 }}>
      <Links />
    </ImageBackground>
  );
};

export default App;

// The following line is to disable all warnings (Keys, depreciated packages, etc...)
console.disableYellowBox = true;
