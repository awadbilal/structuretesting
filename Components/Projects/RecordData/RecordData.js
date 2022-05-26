import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
  const [subscriptionAcc, setSubscriptionAcc] = useState(null);
  const [subscriptionGyr, setSubscriptionGyr] = useState(null);

  const xGyro = [],
    yGyro = [],
    zGyro = [],
    xAcc = [],
    yAcc = [],
    zAcc = [];

  const _subscribe = () => {
    setSubscriptionAcc(
      Accelerometer.addListener((accelerometerData) => {
        xAcc.push(accelerometerData.x);
        yAcc.push(accelerometerData.y);
        zAcc.push(accelerometerData.z);
      })
    );
    setSubscriptionGyr(
      Gyroscope.addListener((gyroscopeData) => {
        xGyro.push(gyroscopeData.x);
        yGyro.push(gyroscopeData.y);
        zGyro.push(gyroscopeData.z);
      })
    );
  };

  const _unsubscribe = () => {
    subscriptionAcc && subscriptionAcc.remove();
    subscriptionGyr && subscriptionGyr.remove();
    setSubscriptionAcc(null);
    setSubscriptionGyr(null);
  };

  useEffect(() => {
    if (remainingTime === false) return;
    Accelerometer.setUpdateInterval(50);
    Gyroscope.setUpdateInterval(50);
    _subscribe();
    const timer = setTimeout(() => {
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
      setRemainingTime(!remainingTime);
      _unsubscribe();
      setIsReady(true);
      setUpdateData(true);
    }, 1000 * parseInt(seconds));
    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  const handleStart = () => {
    setRemainingTime(!remainingTime);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: '80%' }}>
            <Input
              placeholder=""
              type="text"
              value=""
              containerStyle={{ backgroundColor: 'transparent' }}
              inputStyle={{ backgroundColor: 'transparent' }}
              inputContainerStyle={styles.input}
              leftIcon={
                <AntDesign
                  name="arrowleft"
                  color="#F7F7F7"
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
                placeholder="SS"
                type="number"
                placeholderTextColor={'#FFFFFF75'}
                style={{ textAlign: 'left', fontSize: 24, color: '#FFFFFF' }}
                inputContainerStyle={styles.timerInputContainer}
                containerStyle={styles.timerContainerStyle}
                value={seconds}
                maxLength={2}
                onChangeText={(e) => setSeconds(e)}
                keyboardType="number-pad"
              />
            </View>
            <Text>Note that time interval for data is 20 Gigasecond</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default RecordData;
