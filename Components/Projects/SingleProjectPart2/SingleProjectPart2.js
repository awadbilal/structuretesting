import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input, Text } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { styles } from './style';

const SingleProjectPart2 = ({ navigation, item, user }) => {
  const [valueLevel, setValueLevel] = useState(0);
  const [valueDevice, setValueDevice] = useState(0);
  const [levelData, setLevelData] = useState(item?.levels[0]);
  const [deivceData, setDeviceData] = useState(levelData?.devices[0]);
  const [mainArea, setMainArea] = useState(0);

  const data1 = [],
    data2 = [];
  item?.levels?.forEach((lev, i) => {
    data1.push({
      label: `Level ${i} information`,
      value: i,
    });
  });

  useEffect(() => {
    item?.levels[0]?.devices.forEach((dev, i) => {
      data2.push({
        label: `Device ${i}`,
        value: i,
      });
    });
  }, []);

  useEffect(() => {
    setLevelData(item?.levels[valueLevel]);

    while (data2.length) {
      data2.pop();
    }
    item?.levels[valueLevel]?.devices?.forEach((dev, i) => {
      data2.push({
        label: `Device ${i}`,
        value: i,
      });
    });
    setValueDevice(0);
    setDeviceData(item?.levels[valueLevel]?.devices[0]);
  }, [valueLevel]);

  useEffect(() => {
    setDeviceData(levelData?.devices[valueDevice]);
  }, [valueDevice]);

  const handleDelete = async () => {
    // Function to handle deleting the project
    const newProjects = user?.projects?.filter((pr) => pr !== item?.id);
    await deleteDoc(doc(db, "projects", item?.id))
    .then(() => {
      updateDoc(doc(db, 'users', user?.id), {
        projects: [...newProjects],
      });
      navigation.navigate("Projects")
    })
    .catch((err) => alert(err));
  };
  const data3 = [
    { label: 'Project Design', value: 0 },
    { label: 'Line Chart', value: 1 },
    { label: 'Bar Chart', value: 2 },
  ];

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
          (
          <MaterialIcons
            name='delete-forever'
            color='#F7F7F7'
            size={20}
            style={{ position: 'relative', top: -13 }}
            onPress={() => handleDelete()}
          />
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
            data={data1}
            labelField='label'
            valueField='value'
            value={valueLevel}
            onChange={(item) => {
              setValueLevel(item.value);
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
            data={data2}
            labelField='label'
            valueField='value'
            value={valueDevice}
            onChange={(item) => {
              setValueDevice(item.value);
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
        {mainArea === 0 && <Text>Project Design</Text>}
        {mainArea === 0 && !item?.image && (
          <Text>No design picture has been added yet</Text>
        )}
        {mainArea === 1 && <Text>Line Chart</Text>}
        {mainArea === 2 && <Text>Bar Chart</Text>}
        {mainArea !== 0 && !deivceData.x && (
          <Text>No data has been recorded yet</Text>
        )}
      </View>
      {mainArea === 0 && !item?.image && (
        <Text>Put add picture button in here</Text>
      )}
    </View>
  );
};

export default SingleProjectPart2;
