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
import { editAccount } from '../../redux/actions/Account';

const AccountsEditModals = props => {
  const [AcName, changeAcName] = useState('');

  const saveAndCloseModal = async () => {
    if (AcName === '') {
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
    } else {
      await props.edit(props.acIdd, AcName);

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
          placeholder={props.acNamee}
        />

        <TouchableOpacity
          onPress={() => saveAndCloseModal()}
        >
          <View style={styles.btn}>
            <Text style={styles.textBtn}>UPDATE</Text>
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
    edit: (id, name) => dispatch(editAccount(id, name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AccountsEditModals);
