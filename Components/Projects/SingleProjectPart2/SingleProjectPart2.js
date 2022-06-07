import { Platform, View, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linechart } from '../Charts/Charts';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { db, store } from '../../../firebase';
import { styles } from './style';
import DropDowns from './DropDowns';
import Legend from './Legend';
import RecordData from '../RecordData/RecordData';
import { AsyncStorage } from 'react-native';

const SingleProjectPart2 = ({ navigation, item, fetchData }) => {
  // For dropdown selection:
  const [valueDevice, setValueDevice] = useState(0);
  const [valueLevel, setValueLevel] = useState(0);
  const [deviceData, setDeviceData] = useState();
  const [levelData, setLevelData] = useState();
  const [mainArea, setMainArea] = useState(0);
  const [url, setUrl] = useState();
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [gyroscope, setGyroscope] = useState();
  const [accelerometer, setAccelerometer] = useState();
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    })();
  }, []);

  const data1 = [],
    data2 = [],
    data3 = [
      { label: 'Project Design', value: 0 },
      { label: 'Gyroscope Line Chart', value: 1 },
      { label: 'Accelerometer Line Chart', value: 2 },
    ];

  for (let i = 0; i < item?.levels; i++) {
    data1.push({
      label: `Level ${i} information`,
      value: i,
    });
  }

  for (let i = 0; i < item?.users?.length; i++) {
    data2.push({
      label: `Device ${i + 1}`,
      value: i,
    });
  }

  async function fetchImage() {
    if (!item?.image) return;
    const reference = await ref(store, `/${item?.image}`);
    await getDownloadURL(reference)
      .then((data) => setUrl(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchImage();
    setDeviceData(
      Array.isArray(item?.users) && item?.users.length !== 0
        ? item?.users[0]
        : []
    );
    setLevelData(
      Array.isArray(item?.users) && item?.users.length !== 0
        ? item?.users[0]?.levels[0]
        : []
    );

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('sorry, we need camera roll permissions to make this work');
        }
      }
    })();
  }, []);

  useEffect(() => {
    setDeviceData(item?.users[valueDevice]);
    setValueLevel(0);
    setLevelData(item?.users[valueDevice]?.levels[0]);
  }, [valueDevice]);

  useEffect(() => {
    deviceData && setLevelData(deviceData?.levels[valueLevel]);
  }, [valueLevel]);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    }).catch((err) => alert(err));

    const name = await (Math.random() + 1).toString(36);
    if (name.includes('.')) name = name.replace('.', '_');
    const ref = await ref(getStorage(), `${name}.jpg`);
    const img = await fetch(result.uri);
    const bytes = await img.blob();
    await uploadBytes(ref, bytes).catch((err) => alert(err));
    await updateDoc(doc(db, 'projects', item?.id), {
      image: `${name}.jpg`,
    }).catch((err) => alert(err));
    setUrl(`/${name}.jpg`);
  };

  const uploadData = async () => {
    const project = await getDoc(doc(db, 'projects', item?.id));
    const projectUsers = await project.data().users;
    const filteredProjects = projectUsers.filter((pr) => pr.id !== user?.id);
    const newDataToAdd = {
      id: user?.id,
      name: user?.name,
      levels: [
        {
          level: 0,
          gyroscope: gyroscope,
          accelerometer: accelerometer,
        },
      ],
    };
    await updateDoc(doc(db, 'projects', item?.id), {
      users: [...filteredProjects, newDataToAdd],
    }).catch((err) => alert(err));
    fetchData();
  };

  useEffect(() => {
    updateData && uploadData();
  }, [updateData]);

  return (
    <ScrollView>
      {!isReady ? (
        !updateData ? (
          <View style={styles.container}>
            <DropDowns
              navigation={navigation}
              item={item}
              data1={data1}
              data2={data2}
              data3={data3}
              mainArea={mainArea}
              setMainArea={setMainArea}
              valueLevel={valueLevel}
              valueDevice={valueDevice}
              setValueLevel={setValueLevel}
              setValueDevice={setValueDevice}
              fetchData={fetchData}
            />
            <View style={styles.infoContainer}>
              {mainArea === 0 && (
                <ImageBackground
                  source={{ uri: url }}
                  style={styles.latestGradient}
                  imageStyle={{ resizeMode: 'contain' }}
                />
              )}
              {mainArea === 0 && !item?.image && (
                <Text style={{ textAlign: 'center' }}>
                  No design picture has been added yet
                </Text>
              )}
              {mainArea !== 0 &&
                !levelData.accelerometer &&
                !levelData.gyroscope && (
                  <Text style={{ textAlign: 'center' }}>
                    No data has been recorded yet
                  </Text>
                )}
              {mainArea === 1 && (
                <Linechart
                  info={levelData.gyroscope}
                  height={300}
                  width={300}
                  decimalPlaces={4}
                  dotSize='3'
                />
              )}
              {mainArea === 2 && (
                <Linechart
                  info={levelData.accelerometer}
                  height={300}
                  width={300}
                  decimalPlaces={4}
                  dotSize='3'
                />
              )}
            </View>
            {(mainArea === 1 || mainArea === 2) && <Legend />}
            {mainArea === 0 && !item?.image && user?.id === item?.admin.id && (
              <Button
                type='solid'
                radius='16'
                title='Upload Project Design'
                iconRight={true}
                icon={
                  <MaterialCommunityIcons
                    name='upload'
                    size={25}
                    color='#FEFEFE'
                  />
                }
                titleStyle={[styles.buttonTitle, { marginRight: 20 }]}
                buttonStyle={{ backgroundColor: '#3D1273' }}
                containerStyle={styles.addPicture}
                onPress={() => handleImageUpload()}
              />
            )}
            <Button
              type='solid'
              radius='16'
              title='Record New Data'
              iconRight={true}
              titleStyle={[styles.buttonTitle, { marginRight: 20 }]}
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.addPicture}
              onPress={() => setIsReady(true)}
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

export default SingleProjectPart2;
