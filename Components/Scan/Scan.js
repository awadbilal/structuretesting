import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Image } from '@rneui/themed';
import ScanImage from '../../Assets/Scan.png';
import RecordData from '../Projects/RecordData/RecordData';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { styles } from './style';
import QRScan from './QRScan';
import { AsyncStorage } from 'react-native';

const Scan = ({ navigation, projectsList, setProjectsList }) => {
  const [projectCode, setProjectCode] = useState();
  const [isReady, setIsReady] = useState(false);
  const [gyroscope, setGyroscope] = useState();
  const [accelerometer, setAccelerometer] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [start, setStart] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        await setUser(JSON.parse(value));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        // Error saving data
      }
    })();
  }, [user]);

  const handleJoin = async () => {
    // Handle Join Functionality
    if (user?.projects?.includes(projectCode))
      return alert('Project is already registered');
    else {
      const project = await getDoc(doc(db, 'projects', projectCode));
      if (!project.exists())
        return alert('Project Code does not refer to any project');
      else {
        if (
          project.data().users.filter((item) => item.id === user?.id).length !==
          0
        )
          return alert('User is already registered in this project');
        else {
          setIsReady(true);
        }
      }
    }
  };

  // const handleQRCode = async () => {
  //   // A function to handle joining through QRCode
  // };

  const uploadData = async () => {
    const project = await getDoc(doc(db, 'projects', projectCode));

    await updateDoc(doc(db, 'projects', projectCode), {
      users: [
        ...project?.data()?.users,
        {
          id: user?.id,
          name: user?.name,
          levels: project?.data()?.users?.levels
            ? [
                ...project?.data()?.users?.levels,
                {
                  level: project?.data()?.users?.levels?.length,
                  gyroscope: gyroscope,
                  accelerometer: accelerometer,
                },
              ]
            : [
                {
                  level: 0,
                  gyroscope: gyroscope,
                  accelerometer: accelerometer,
                },
              ],
        },
      ],
    }).catch((err) => alert(err));

    await updateDoc(doc(db, 'users', user?.id), {
      projects: user.projects
        ? [...user?.projects, projectCode]
        : [projectCode],
    }).catch((err) => alert(err));
    setUser({
      ...user,
      projects: [...user?.projects, projectCode],
    });
    setProjectsList([...projectsList, project.data()]);
  };

  useEffect(() => {
    updateData && uploadData();
  }, [updateData]);

  return (
    <ScrollView>
      {!isReady ? (
        !updateData ? (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Join Project</Text>
            </View>
            <Input
              placeholder='K4z5mZeFa153'
              type='text'
              value={projectCode}
              onChangeText={(e) => setProjectCode(e)}
              style={{ color: '#FFF' }}
              placeholderTextColor={'#FFFFFF75'}
              inputStyle={{
                color: '#FFF',
                backgroundColor: '#0E0A0A08',
                borderRadius: 8,
                textAlign: 'center',
              }}
              inputContainerStyle={styles.input}
              leftIcon={
                <Text
                  style={{ color: '#FFFFFF', marginRight: 10, fontSize: 16 }}
                >
                  Project Code:
                </Text>
              }
            />
            <Button
              type='solid'
              radius='16'
              title='Join Project'
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              onPress={() => handleJoin()}
            />
            {!start ? (
              <Image source={ScanImage} style={styles.qrcode} />
            ) : (
              <View style={styles.qrcode}>
                <QRScan
                  scanned={scanned}
                  setScanned={setScanned}
                  setProjectCode={setProjectCode}
                  handleJoin={handleJoin}
                />
              </View>
            )}
            <Button
              type='solid'
              radius='16'
              title='Scan QR Code to join instead'
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              onPress={() => {
                setStart(!start);
                setScanned(false);
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 30,
            }}
          >
            <Text style={[styles.title, { textAlign: 'center' }]}>
              Data has been recorded and uploaded, head to projects list to
              check your project
            </Text>
            <Button
              type='solid'
              radius='16'
              title='View projects list'
              titleStyle={styles.buttonTitle}
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.inviteAndContinue}
              onPress={() => navigation.goBack()}
            />
          </View>
        )
      ) : (
        <RecordData
          setGyroscope={setGyroscope}
          setAccelerometer={setAccelerometer}
          setIsReady={setIsReady}
          setUpdateData={setUpdateData}
        />
      )}
    </ScrollView>
  );
};

export default Scan;
