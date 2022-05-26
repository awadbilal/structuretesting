import { ScrollView, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../About/style';

const Privacy = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Input
            placeholder={'Privacy Policy'}
            type="text"
            value={'Privacy Policy'}
            style={styles.font}
            containerStyle={{ backgroundColor: 'transparent' }}
            inputStyle={{ backgroundColor: 'transparent' }}
            inputContainerStyle={styles.headerInput}
            leftIcon={
              <AntDesign
                name="arrowleft"
                color="#F7F7F7"
                size={20}
                style={{ marginRight: 10 }}
                onPress={() => navigation.goBack()}
              />
            }
            disabled={true}
          />
        </View>
        <Text style={[styles.subText, { marginTop: 14 }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
          imperdiet tempus pharetra aliquet massa facilisis gravida nisi,
          fermentum. Augue auctor nunc ligula metus. Tristique hac senectus
          ultrices gravida eu id vivamus interdum. Lacus aliquam sed accumsan a
          phasellus cras. Suspendisse tortor eros lorem malesuada non, vel mi
          adipiscing curabitur. Aenean egestas tincidunt laoreet lorem tortor.
          Ac facilisis leo nisi netus parturient. Enim viverra cursus interdum
          nibh ornare commodo. Lacus, vestibulum massa, lectus adipiscing sed
          nullam. Risus enim placerat iaculis dictum diam placerat feugiat
          lobortis bibendum. Commodo vel non eget dignissim neque curabitur.
          Viverra curabitur egestas feugiat duis tellus, eu sed eleifend netus.
          Iaculis at at lacus pulvinar id mi habitant. Vel, rhoncus, viverra sed
          facilisi felis morbi. Donec pretium molestie vulputate vitae faucibus
          cursus. Molestie eu at vitae elit id non vitae. Id vel id sed ut sed
          arcu amet. Cursus a, ornare libero, nam. Condimentum egestas
          suspendisse mattis cursus enim ornare vitae, maecenas. Sem platea ac,
          aliquam erat risus. Quisque nec quis purus, a ac est.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Privacy;
