import { Platform, View, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input, Text, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { db, store } from '../../../firebase';
import { styles } from './style';

const SingleProjectPart2 = ({ navigation, item, user, setUser }) => {
  // For dropdown selection:
  const [valueDevice, setValueDevice] = useState(0);
  const [valueLevel, setValueLevel] = useState(0);

  // For Data handling itself
  const [deviceData, setDeviceData] = useState();
  const [levelData, setLevelData] = useState();
  const [mainArea, setMainArea] = useState(0);
  const [url, setUrl] = useState();

  const data1 = [],
    data2 = [],
    data3 = [
      { label: 'Project Design', value: 0 },
      { label: 'Gyroscope Line Chart', value: 1 },
      { label: 'Gyroscope Bar Chart', value: 2 },
      { label: 'Accelerometer Line Chart', value: 3 },
      { label: 'Accelerometer Bar Chart', value: 4 },
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
    const reference = await ref(store, `/${item?.image}`);
    await getDownloadURL(reference)
      .then((data) => setUrl(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchImage();
    setDeviceData(item?.users[0]);
    setLevelData(item?.users[0]?.levels[0]);

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('sorry, we eed camera roll permissions to make this work');
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

  const handleDelete = async () => {
    // Function to handle deleting the project
    const newProjects = user?.projects?.filter((pr) => pr !== item?.id);
    await updateDoc(doc(db, 'users', user?.id), {
      projects: newProjects,
    })
      .then(async () => {
        setUser({
          ...user,
          projects: [...user?.projects.filter((pr) => pr !== item?.id)],
        });
        await deleteDoc(doc(db, 'projects', item?.id)).catch((err) =>
          alert(err)
        );
        navigation.navigate('Projects');
      })
      .catch((err) => alert(err));
  };

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: '80%' }}>
          <Input
            placeholder={item?.title}
            type='text'
            value={item?.title}
            style={styles.font}
            containerStyle={{ backgroundColor: 'transparent' }}
            inputStyle={{ backgroundColor: 'transparent' }}
            inputContainerStyle={styles.input}
            leftIcon={
              <AntDesign
                name='arrowleft'
                color='#F7F7F7'
                size={20}
                style={{ marginRight: 10 }}
                onPress={() => navigation.goBack()}
              />
            }
            disabled={true}
          />
        </View>
        <View style={{ width: '20%' }}>
          {item?.admin?.id === user?.id && (
            <MaterialIcons
              name='delete-forever'
              color='#F7F7F7'
              size={20}
              style={{ position: 'relative', top: -13 }}
              onPress={() => handleDelete()}
            />
          )}
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownArea}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownList}
            iconColor={'#FFFFFF'}
            data={data2}
            labelField='label'
            valueField='value'
            value={valueDevice}
            onChange={(item) => {
              setValueDevice(item.value);
            }}
          />
        </View>
        <View style={styles.dropdownArea}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownList}
            iconColor={'#FFFFFF'}
            data={data1}
            labelField='label'
            valueField='value'
            value={valueLevel}
            onChange={(item) => {
              setValueLevel(item.value);
            }}
          />
        </View>
      </View>
      <Dropdown
        style={{ width: '100%', backgroundColor: 'transparent' }}
        placeholderStyle={{
          color: '#FFFFFF',
          fontSize: 20,
          lineHeight: 20,
          backgroundColor: 'transparent',
        }}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { fontSize: 20, lineHeight: 20 },
        ]}
        maxHeight={320}
        containerStyle={styles.dropdownList}
        iconColor={'#FFFFFF'}
        data={data3}
        labelField='label'
        valueField='value'
        value={mainArea}
        onChange={(item) => {
          console.log(item);
          setMainArea(item.value);
        }}
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
        {mainArea !== 0 && !levelData.accelerometer && !levelData.gyroscope && (
          <Text style={{ textAlign: 'center' }}>
            No data has been recorded yet
          </Text>
        )}
        {mainArea === 1 && <Text>Gyroscope Line Chart</Text>}
        {mainArea === 2 && <Text>Gyroscope Bar Chart</Text>}
        {mainArea === 3 && <Text>Accelerometer Line Chart</Text>}
        {mainArea === 4 && <Text>Accelerometer Bar Chart</Text>}
      </View>
      {mainArea === 0 && !item?.image && (
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
  );
};

export default SingleProjectPart2;
