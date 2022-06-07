import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { styles } from './style';
import { AsyncStorage } from 'react-native';

const DropDowns = ({
  navigation,
  item,
  data1,
  data2,
  data3,
  mainArea,
  setMainArea,
  valueLevel,
  valueDevice,
  setValueLevel,
  setValueDevice,
  fetchData,
}) => {
  const [user, setUser] = React.useState();

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    })();
  }, []);

  const handleDelete = async () => {
    // Function to handle deleting the project
    item?.users?.forEach(async ({ id }) => {
      const anonymos = await getDoc(doc(db, 'users', id));
      await updateDoc(doc(db, 'users', id), {
        projects: [
          ...anonymos?.data()?.projects?.filter((pr) => pr !== item?.id),
        ],
      });
    });
    await setUser({
      ...user,
      projects: [...user?.projects.filter((pr) => pr !== item?.id)],
    });
    await deleteDoc(doc(db, 'projects', item?.id)).catch((err) => alert(err));
    fetchData();
    navigation.pop(2);
  };

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        // Error saving data
      }
    })();
  }, [user]);

  return (
    <>
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
          setMainArea(item.value);
        }}
      />
    </>
  );
};

export default DropDowns;
