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
  setUpdateData,
}) => {
  const [seconds, setSeconds] = useState();
  const [remainingTime, setRemainingTime] = useState();
  const [subscription, setSubscription] = useState(null);
  const xGyro = [],
    yGyro = [],
    zGyro = [],
    xAcc = [],
    yAcc = [],
    zAcc = [];

  const _subscribe = () => {
    setSubscription(true);
    Gyroscope.addListener((gyroscopeData) => {
      xGyro.push(gyroscopeData.x);
      yGyro.push(gyroscopeData.y);
      zGyro.push(gyroscopeData.z);
    });
    Accelerometer.addListener((accelerometerData) => {
      xAcc.push(Math.round(accelerometerData.x * 10000) / 10000);
      yAcc.push(Math.round(accelerometerData.y * 10000) / 10000);
      zAcc.push(Math.round(accelerometerData.z * 10000) / 10000);
    });
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const wait = (timeout) => {
    return new Promise(() =>
      setTimeout(() => {
        _subscribe();
        setRemainingTime(true);
        Gyroscope.setUpdateInterval(20);
        Accelerometer.setUpdateInterval(20);
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
      }, timeout)
    );
  };

  const handleStart = useCallback(() => {
    if (seconds > 60) return alert('Seconds cannot exceed 60 seconds');
    wait(1000 * parseInt(seconds));
    return () => _unsubscribe();
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
        <>
          <View style={styles.timerContainer}>
            <Text>Seconds to record</Text>
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
          <Text>Note that time interval for data is 20 Gigasecond</Text>
        </>
      )}
    </View>
  );
};

export default RecordData;
