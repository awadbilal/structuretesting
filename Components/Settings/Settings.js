import { ScrollView, View } from 'react-native';
import React from 'react';
import { Text, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './style';

const Settings = ({ navigation, setUser }) => {
  const [isLogout, setIsLogout] = React.useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={25}
              style={styles.icon}
            />
            <Button
              type="clear"
              radius="16"
              title="Profile Settings"
              titleStyle={styles.itemButton}
              onPress={() => navigation.navigate('ProfileSettings')}
              iconRight={true}
              icon={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color="#FEFEFE"
                />
              }
            />
          </View>

          <View style={styles.itemInnerContainer}>
            <MaterialCommunityIcons
              name="information-outline"
              size={25}
              style={styles.icon}
            />
            <Button
              type="clear"
              radius="16"
              title="About Us"
              titleStyle={styles.itemButton}
              onPress={() => navigation.navigate('AboutUs')}
              iconRight={true}
              icon={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color="#FEFEFE"
                />
              }
            />
          </View>

          <View style={styles.itemInnerContainer}>
            <MaterialCommunityIcons
              name="file-document-multiple-outline"
              size={25}
              style={styles.icon}
            />
            <Button
              type="clear"
              radius="16"
              title="Terms And Conditions"
              titleStyle={styles.itemButton}
              onPress={() => navigation.navigate('TermsAndConditions')}
              iconRight={true}
              icon={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color="#FEFEFE"
                />
              }
            />
          </View>

          <View style={styles.itemInnerContainer}>
            <MaterialIcons name="privacy-tip" size={25} style={styles.icon} />
            <Button
              type="clear"
              radius="16"
              title="Privacy Policy"
              titleStyle={styles.itemButton}
              onPress={() => navigation.navigate('PrivacyPolicy')}
              iconRight={true}
              icon={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color="#FEFEFE"
                />
              }
            />
          </View>

          <View style={styles.itemInnerContainer}>
            <AntDesign name="logout" size={25} style={styles.icon} />
            <Button
              type="clear"
              radius="16"
              title="Log out"
              titleStyle={styles.itemButton}
              onPress={() => setIsLogout(!isLogout)}
              iconRight={true}
              icon={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color="#FEFEFE"
                />
              }
            />
          </View>
          {isLogout && (
            <View
              style={[
                styles.itemInnerContainer,
                { justifyContent: 'space-between' },
              ]}
            >
              <Button
                type="clear"
                radius="16"
                title="Cancel"
                titleStyle={styles.itemButton}
                containerStyle={{
                  width: '45%',
                  paddingVertical: 15,
                  backgroundColor: '#3D127375',
                  borderRadius: 16,
                }}
                onPress={() => setIsLogout(!isLogout)}
              />
              <Button
                type="clear"
                radius="16"
                title="Log out"
                titleStyle={styles.itemButton}
                containerStyle={{
                  width: '45%',
                  paddingVertical: 15,
                  backgroundColor: '#3D1273',
                  borderRadius: 16,
                }}
                onPress={() => {
                  setUser();
                  alert('User has been logged out');
                  navigation.navigate('Register');
                }}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
