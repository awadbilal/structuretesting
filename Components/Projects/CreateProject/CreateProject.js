import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RecordData from '../RecordData/RecordData';
import QRCode from 'react-native-qrcode-svg';
import { doc, addDoc, updateDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { styles } from '../SingleProjectPage/style';

const CreateProject = ({ navigation, user, setUser, update, setUpdate }) => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('New Project');
  const [levelsNumber, setLevelsNumber] = useState(1);
  const [show, setShow] = useState(false);
  const [projectCode, setProjectCode] = useState('');
  const [gyroscope, setGyroscope] = useState();
  const [accelerometer, setAccelerometer] = useState();
  const [isReady, setIsReady] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [counter, setCounter] = useState(0);

  // Initializing the project in the database
  const initializeProject = async () => {
    let date = new Date();
    date = date.toDateString().substring(4);
    date = `${date.substring(0, 6)}, ${date.substring(7)}`;

    const data = await {
      title: title,
      admin: {
        id: user?.id,
        name: user?.name,
      },
      date: date,
      levels: levelsNumber,
    };
    const docRef = await addDoc(collection(db, 'projects'), data).catch((err) =>
      alert(err)
    );
    await setUser({
      ...user,
      projects:
        Array.isArray(user?.projects) && user?.projects.length !== 0
          ? [...user.projects, docRef?.id]
          : [docRef?.id],
    });
    await updateDoc(doc(db, 'users', user?.id), {
      projects:
        Array.isArray(user?.projects) && user?.projects.length !== 0
          ? [...user.projects, docRef?.id]
          : [docRef?.id],
    }).catch((err) => alert(err));
    await setProjectCode(docRef?.id);
    setCounter(counter + 1);
  };

  useEffect(() => {
    counter === 0 && initializeProject();
  }, []);

  async function handleSave() {
    const data = {
      title: title,
      levels: levelsNumber,
    };

    await updateDoc(doc(db, 'projects', projectCode), data).catch((err) =>
      alert(err)
    );
    setIsReady(true);
  }

  const uploadData = async () => {
    await updateDoc(doc(db, 'projects', projectCode), {
      users: [
        {
          id: user?.id,
          name: user?.name,
          levels: [
            {
              level: 0,
              gyroscope: gyroscope,
              accelerometer: accelerometer,
            },
          ],
        },
      ],
    }).catch((err) => alert(err));
    await setUpdate(!update);
  };

  useEffect(() => {
    updateData && uploadData();
  }, [updateData]);

  const handleInvite = () => {
    setShow(!show);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {!isReady ? (
        !updateData ? (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={{ width: '80%' }}>
                <Input
                  placeholder={title}
                  type="text"
                  value={title}
                  onChangeText={(e) => setTitle(e)}
                  style={styles.font}
                  containerStyle={{ backgroundColor: 'transparent' }}
                  inputStyle={{ backgroundColor: 'transparent' }}
                  inputContainerStyle={styles.input}
                  leftIcon={
                    <AntDesign
                      name="arrowleft"
                      color="#F7F7F7"
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
                type="text"
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
                containerStyle={{
                  backgroundColor: 'transparent',
                  width: '30%',
                }}
                inputStyle={{ backgroundColor: 'transparent' }}
                inputContainerStyle={[styles.input]}
              />
            </View>
            <Text style={styles.devices}>Linked Devices</Text>
            <View style={styles.devicesContainer}>
              {show ? (
                <QRCode
                  size={250}
                  value={projectCode}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <>
                  <View style={styles.devicesInnerContainer}>
                    <Text style={styles.devicesNumber}>1</Text>
                    <Text style={styles.devicesUser}>{user?.name}</Text>
                    <MaterialCommunityIcons
                      name="crown"
                      style={styles.devicesRemove}
                    />
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
                                setUsers(
                                  users.filter((id) => id?.id !== usr?.id)
                                )
                              }
                            >
                              X
                            </Text>
                          </View>
                        );
                      })}
                  </ScrollView>
                </>
              )}
            </View>
            <Button
              type="solid"
              radius="16"
              title={show ? projectCode : 'Invite Others'}
              iconRight={true}
              icon={
                show ? (
                  <MaterialCommunityIcons
                    name="link-variant"
                    size={25}
                    color="#FEFEFE"
                  />
                ) : null
              }
              titleStyle={[styles.buttonTitle, { marginRight: 20 }]}
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.inviteAndContinue}
              onPress={() => handleInvite()}
            />
            <Button
              type="solid"
              radius="16"
              title="Save and Continue To Record Data"
              titleStyle={styles.buttonTitle}
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.inviteAndContinue}
              onPress={() => handleSave()}
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
              type="solid"
              radius="16"
              title="View projects list"
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

export default CreateProject;
