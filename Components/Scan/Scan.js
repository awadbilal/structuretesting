import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Image } from '@rneui/themed';
import ScanImage from '../../Assets/Scan.png';
import RecordData from '../Projects/RecordData/RecordData';
import { doc, updateDoc, deleteField, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { styles } from './style';

const Scan = ({ user, setUser, projectsList, setProjectsList }) => {
  const [projectCode, setProjectCode] = useState();
  const [isReady, setIsReady] = useState(false);
  const [gyroscope, setGyroscope] = useState();
  const [accelerometer, setAccelerometer] = useState();
  const [updateData, setUpdateData] = useState(false);

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

  const handleQRCode = async () => {
    // A function to handle joining through QRCode
  };

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
    <>
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
            <Image source={ScanImage} style={styles.qrcode} />
            <Button
              type='solid'
              radius='16'
              title='Scan QR Code to join instead'
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              onPress={() => console.log('Hello QRCode')}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Text style={styles.title}>
              Data has been recorded and uploaded, head to projects list to
              check your project
            </Text>
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
    </>
  );
};

export default Scan;
