import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../../firebase';
import { styles } from './style';

const SingleProject = ({ navigation, item }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [users, setUsers] = useState(item?.users);
  const [title, setTitle] = useState(item?.title);

  async function handleSave() {
    setIsEditable(!isEditable);
    // Send to firebase
    await updateDoc(doc(db, 'projects', item.id), {
      title: title,
    });
  }

  async function handleUsers() {
    await updateDoc(doc(db, 'projects', item.id), {
      users: [...users],
    });
  }

  useEffect(() => {
    handleUsers();
  }, [users]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: '80%' }}>
          <Input
            placeholder={item?.title}
            type='text'
            value={title}
            onChangeText={(e) => setTitle(e)}
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
            disabled={isEditable ? false : true}
          />
        </View>
        <View style={{ width: '20%' }}>
          {isEditable ? (
            <Octicons
              name='check'
              color='#F7F7F7'
              size={22}
              style={{ position: 'relative', top: -5 }}
              onPress={() => handleSave()}
            />
          ) : (
            <Octicons
              name='pencil'
              color='#F7F7F7'
              size={20}
              style={{ position: 'relative', top: -5 }}
              onPress={() => setIsEditable(!isEditable)}
            />
          )}
        </View>
      </View>
      <View style={styles.levels}>
        <Text style={styles.levelsText}>Number of Levels</Text>
        <Text style={styles.levelsNumber}>{item?.levels?.length}</Text>
      </View>
      <Text style={styles.devices}>Linked Devices</Text>
      <View style={styles.devicesContainer}>
        <View style={styles.devicesInnerContainer}>
          <Text style={styles.devicesNumber}>1</Text>
          <Text style={styles.devicesUser}>{item?.admin?.name}</Text>
          <MaterialCommunityIcons name='crown' style={styles.devicesRemove} />
        </View>
        {users
          ?.filter((usr) => usr !== item?.admin?.id)
          .map((usr, i) => {
            return (
              <View style={styles.devicesInnerContainer} key={i}>
                <Text style={styles.devicesNumber}>{i + 2}</Text>
                <Text style={styles.devicesUser}>{usr?.name}</Text>
                <Text
                  style={styles.devicesRemove}
                  onPress={() =>
                    setUsers(users.filter((id) => id?.id !== usr?.id))
                  }
                >
                  X
                </Text>
              </View>
            );
          })}
      </View>
      <Button
        type='solid'
        radius='16'
        title='Continue'
        titleStyle={styles.buttonTitle}
        buttonStyle={{ backgroundColor: '#3D1273' }}
        containerStyle={styles.inviteAndContinue}
        onPress={() => navigation.navigate(`${item?.id}part2`)}
      />
    </View>
  );
};

export default SingleProject;
