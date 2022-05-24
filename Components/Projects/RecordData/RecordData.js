import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { styles } from './style';

const RecordData = ({
  setGyroscope,
  setAccelerometer,
  setIsReady,
  refreshing,
  setRefreshing,
  setUpdateData,
}) => {
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [remainingTime, setRemainingTime] = useState();
  const [subscription, setSubscription] = useState(null);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const xGyro = [],
    yGyro = [],
    zGyro = [],
    xAcc = [],
    yAcc = [],
    zAcc = [];

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
    Gyroscope.addListener((gyroscopeData) => {
      xGyro.push(gyroscopeData.x);
      yGyro.push(gyroscopeData.y);
      zGyro.push(gyroscopeData.z);
    });
    Accelerometer.addListener((accelerometerData) => {
      xAcc.push(accelerometerData.x);
      yAcc.push(accelerometerData.y);
      zAcc.push(accelerometerData.z);
    });
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const handleStart = useCallback(() => {
    _subscribe();
    setRemainingTime(true);
    Gyroscope.setUpdateInterval(16);
    Accelerometer.setUpdateInterval(16);
    wait(1000 * (parseInt(minutes) * 60 + parseInt(seconds))).then(() => {
      setGyroscope({
        x: xGyro,
        y: yGyro,
        z: zGyro,
      });
      setAccelerometer({
        x: xAcc,
        y: yAcc,
        z: zAcc,
      });
      _unsubscribe();
      setRemainingTime(false);
      setSubscription(null);
      setUpdateData(true);
      setIsReady(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: '80%' }}>
          <Input
            placeholder=''
            type='text'
            value=''
            containerStyle={{ backgroundColor: 'transparent' }}
            inputStyle={{ backgroundColor: 'transparent' }}
            inputContainerStyle={styles.input}
            leftIcon={
              <AntDesign
                name='arrowleft'
                color='#F7F7F7'
                size={20}
                style={{ marginRight: 10 }}
                onPress={() => setIsReady(false)}
              />
            }
          />
        </View>
      </View>
      <View style={styles.startButton}>
        <View style={styles.outerCircle}>
          <View style={styles.middleCircle}>
            <View style={styles.innerCircle}>
              <Button
                title={remainingTime ? 'Recording' : 'Start'}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
                style={styles.buttonContainerStyle}
                buttonStyle={styles.buttonContainerStyle}
                onPress={() => handleStart()}
                disabled={remainingTime ? true : false}
              />
            </View>
          </View>
        </View>
      </View>
      {!remainingTime && (
        <View style={styles.timerContainer}>
          <Input
            placeholder='MM'
            type='number'
            placeholderTextColor={'#FFFFFF75'}
            style={{ textAlign: 'right', fontSize: 24, color: '#FFFFFF' }}
            inputContainerStyle={styles.timerInputContainer}
            containerStyle={styles.timerContainerStyle}
            value={minutes}
            maxLength={2}
            onChangeText={(e) => setMinutes(e)}
            keyboardType='number-pad'
          />
          <Text
            h1
            style={{
              width: '20%',
              color: '#FFFFFF',
              textAlign: 'center',
              paddingBottom: 14,
            }}
          >
            :
          </Text>
          <Input
            placeholder='SS'
            type='number'
            placeholderTextColor={'#FFFFFF75'}
            style={{ textAlign: 'left', fontSize: 24, color: '#FFFFFF' }}
            inputContainerStyle={styles.timerInputContainer}
            containerStyle={styles.timerContainerStyle}
            value={seconds}
            maxLength={2}
            onChangeText={(e) => setSeconds(e)}
            keyboardType='number-pad'
          />
        </View>
      )}
    </View>
  );
};

export default RecordData;
