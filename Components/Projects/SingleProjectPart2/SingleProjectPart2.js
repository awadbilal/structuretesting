import { Platform, View, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linechart } from '../Charts/Charts';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { db, store } from '../../../firebase';
import { styles } from './style';
import DropDowns from './DropDowns';

const SingleProjectPart2 = ({ navigation, item, user, setUser, fetchData }) => {
  // For dropdown selection:
  const [valueDevice, setValueDevice] = useState(0);
  const [valueLevel, setValueLevel] = useState(0);
  const [deviceData, setDeviceData] = useState();
  const [levelData, setLevelData] = useState();
  const [mainArea, setMainArea] = useState(0);
  const [url, setUrl] = useState();

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <DropDowns
          navigation={navigation}
          user={user}
          setUser={setUser}
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
        {mainArea === 0 && !item?.image && user.id === item?.admin.id && (
          <Button
            type='solid'
            radius='16'
            title='Upload Project Design'
            iconRight={true}
            icon={
              <MaterialCommunityIcons name='upload' size={25} color='#FEFEFE' />
            }
            titleStyle={[styles.buttonTitle, { marginRight: 20 }]}
            buttonStyle={{ backgroundColor: '#3D1273' }}
            containerStyle={styles.addPicture}
            onPress={() => handleImageUpload()}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SingleProjectPart2;
