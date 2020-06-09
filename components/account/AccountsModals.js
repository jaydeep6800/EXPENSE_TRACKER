import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Color } from '../../commons/Color';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Redux ...
import { connect } from 'react-redux';
import { addAccount } from '../../redux/actions/Account';

const AccountsModals = props => {
  const [AcName, changeAcName] = useState('');
  const [AcBalance, changeAcBalance] = useState('');

  const saveAndCloseModal = async () => {
    if (
      AcName === '' ||
      AcBalance === '' ||
      isNaN(AcBalance)
    ) {
      if (isNaN(AcBalance)) {
        await Alert.alert(
          'FAILED',
          `Initial Balance must be number.`,
          [
            {
              text: 'OK',
              onPress: () => {}
            }
          ],
          { cancelable: false }
        );
      } else {
        await Alert.alert(
          'FAILED',
          `Please fill all details ...`,
          [
            {
              text: 'OK',
              onPress: () => {}
            }
          ],
          { cancelable: false }
        );
      }
    } else {
      await props.add(
        AcName,
        AcBalance,
        new Date().toString()
      );
      await props.toggleModal();
    }
  };

  return (
    <Modal
      isVisible={props.state}
      onBackdropPress={props.toggleModal}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={props.toggleModal}>
          <Icon style={styles.icon} name="window-close" />
        </TouchableOpacity>
        <Text style={styles.text}>Account Name :</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={name => {
            changeAcName(name);
          }}
        />
        <Text style={styles.text}>Initial Balance :</Text>
        <TextInput
          style={styles.textBox}
          keyboardType="number-pad"
          onChangeText={balance => {
            changeAcBalance(balance);
          }}
        />
        <TouchableOpacity
          onPress={() => saveAndCloseModal()}
        >
          <View style={styles.btn}>
            <Text style={styles.textBtn}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.subPrimaryColor,
    paddingHorizontal:
      (Dimensions.get('window').width * 6) / 100,
    paddingVertical:
      (Dimensions.get('window').height * 2) / 100,
    borderRadius: 10
  },
  icon: {
    fontSize: (Dimensions.get('window').width * 6) / 100,
    color: Color.secondaryColor,
    alignSelf: 'flex-end'
  },
  btn: {
    backgroundColor: Color.primaryColor,
    width: '100%',
    height: (Dimensions.get('window').height * 5) / 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:
      (Dimensions.get('window').height * 3) / 100
  },
  text: {
    color: Color.secondaryColor,
    fontSize: (Dimensions.get('window').width * 5) / 100,
    marginTop: (Dimensions.get('window').height * 2) / 100
  },
  textBtn: {
    color: Color.subPrimaryColor,
    fontWeight: 'bold',
    fontSize: (Dimensions.get('window').width * 5) / 100
  },
  textBox: {
    borderBottomWidth: 1,
    borderBottomColor: Color.subSecondaryColor,
    paddingTop: (Dimensions.get('window').height * 2) / 100
  }
});

const mapDispatchToProps = dispatch => {
  return {
    add: (name, price, date) =>
      dispatch(
        addAccount({
          name,
          price,
          date
        })
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AccountsModals);
