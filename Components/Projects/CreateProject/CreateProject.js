import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import { styles } from '../SingleProjectPage/style';

const SingleProject = ({ navigation, user, setDataFor }) => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('New Project');
  const [levelsNumber, setLevelsNumber] = useState(2);

  async function handleSave() {
    let date = new Date();
    date = date.toDateString().substring(4);
    date = `${date.substring(0, 6)}, ${date.substring(7)}`;
    const data = {
      title: title,
      admin: {
        id: user?.id,
        name: user?.name,
      },
      date: date,
      levels: levelsNumber.map((level, i) => {
        return {
          level: i,
          devices: [],
        };
      }),
      users: users,
    };

    const docRef = await addDoc(collection(db, 'projects'), data);
    await updateDoc(doc(db, 'users', user?.id), {
      projects: [...user?.projects, docRef?.id],
    });
    await setDataFor(docRef?.id);
  }

  async function handleInvite() {
    // Handle inviting others
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: '80%' }}>
          <Input
            placeholder={title}
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
          />
        </View>
      </View>
      <View style={[styles.levels, { paddingVertical: 0 }]}>
        <Text style={styles.levelsText}>Number of Levels</Text>
        <Input
          placeholder={`${levelsNumber}`}
          type='text'
          value={`${levelsNumber}`}
          onChangeText={(e) => setLevelsNumber(e)}
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: '#F7F7F7',
            width: '30%',
            textAlign: 'center',
            paddingTop: 22.5,
          }}
          containerStyle={{ backgroundColor: 'transparent', width: '30%' }}
          inputStyle={{ backgroundColor: 'transparent' }}
          inputContainerStyle={[styles.input]}
        />
      </View>
      <Text style={styles.devices}>Linked Devices</Text>
      <View style={styles.devicesContainer}>
        <View style={styles.devicesInnerContainer}>
          <Text style={styles.devicesNumber}>1</Text>
          <Text style={styles.devicesUser}>{user?.name}</Text>
          <MaterialCommunityIcons name='crown' style={styles.devicesRemove} />
        </View>
        <ScrollView>
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
        </ScrollView>
      </View>
      <Button
        type='solid'
        radius='16'
        title='Invite Others'
        iconRight={true}
        icon={
          <MaterialCommunityIcons
            name='link-variant'
            size={25}
            color='#FEFEFE'
          />
        }
        titleStyle={[styles.buttonTitle, { marginRight: 20 }]}
        buttonStyle={{ backgroundColor: '#3D1273' }}
        containerStyle={styles.inviteAndContinue}
        onPress={handleInvite}
      />
      <Button
        type='solid'
        radius='16'
        title='Save and Continue'
        titleStyle={styles.buttonTitle}
        buttonStyle={{ backgroundColor: '#3D1273' }}
        containerStyle={styles.inviteAndContinue}
        onPress={handleSave}
      />
    </View>
  );
};

export default SingleProject;
