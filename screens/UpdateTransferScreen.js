import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Color } from '../commons/Color';

//Redux ...
import { connect } from 'react-redux';
import {
  editTransfer,
  deleteTransfer
} from '../redux/actions/Trans';
import {
  addAccountPrice,
  subAccountPrice
} from '../redux/actions/Account';

import moment from 'moment';

import RNPickerSelect from 'react-native-picker-select';

import DateTimePicker from '@react-native-community/datetimepicker';
import StatusBar from '../components/StatusBar';
import TransAddTitleBar from '../components/trans/TransAddTitleBar';

const UpdateTransferScreen = props => {
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const Result = await props.accounts;

      if (await Result) {
        const data = Result.rows._array;
        await data.forEach(function(element) {
          element.value = element.accountId.toString();
          element.label = `${element.name}   ($ ${element.price}) `;
        });
        await setAccountData(data);
      }
    };
    getData();
  });

  const [date, setDate] = useState(
    moment(props.route.params.transferObj.date)
  );
  const [amount, setAmount] = useState(
    props.route.params.transferObj.price
  );
  const [fromAccount, setFromAccount] = useState(
    props.route.params.transferObj.transferfrom
  );
  const [toAccount, setToAccount] = useState(
    props.route.params.transferObj.transferto
  );
  const [name, setName] = useState(
    props.route.params.transferObj.name
  );

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(moment(currentDate).format());
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const saveData = async () => {
    if (
      name === '' ||
      amount === '' ||
      date.toString() === '' ||
      fromAccount === '' ||
      toAccount === '' ||
      isNaN(amount)
    ) {
      if (isNaN(amount)) {
        await Alert.alert(
          'FAILED',
          `Amount must be number.`,
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
    } else if (fromAccount === toAccount) {
      await Alert.alert(
        'FAILED',
        `Both Accounts can't be same. Please use different account to transfer Fund.`,
        [
          {
            text: 'OK',
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    } else {
      await props.addPrice(
        props.route.params.transferObj.transferfrom,
        props.route.params.transferObj.price
      );
      await props.subPrice(
        props.route.params.transferObj.transferto,
        props.route.params.transferObj.price
      );

      await props.editTransfer({
        id: props.route.params.transferObj.tranferId,
        name: name,
        transferfrom: fromAccount,
        transferto: toAccount,
        price: amount,
        date: date.toString()
      });

      await props.addPrice(toAccount, amount);
      await props.subPrice(fromAccount, amount);

      await Alert.alert(
        'SUCCESS',
        'Data Saved Sucessfully',
        [
          {
            text: 'OK',
            onPress: () => props.navigation.goBack()
          }
        ],
        { cancelable: false }
      );
    }
  };
  const DeleteData = async () => {
    await Alert.alert(
      'Are you sure?',
      `You can't restore the Transfer Detail once deleted.`,
      [
        {
          text: 'CANCEL',
          onPress: () => {}
        },
        {
          text: 'OK',
          onPress: async () => {
            await props.addPrice(
              props.route.params.transferObj.transferfrom,
              props.route.params.transferObj.price
            );
            await props.subPrice(
              props.route.params.transferObj.transferto,
              props.route.params.transferObj.price
            );
            await props.deleteTransfer(
              props.route.params.transferObj.tranferId
            );

            await props.navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={{ flex: 1 }}>
        <StatusBar />
        <TransAddTitleBar
          Text={`EDIT TRANSFER`}
          navigation={props.navigation}
        />
        <View style={styles.container}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={moment(date).toDate()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.content}>
            <Text style={styles.text}>Date</Text>
            <View style={styles.Datecontent}>
              <View style={{ ...styles.input, flex: 1 }}>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={styles.dateTimePickerText}>
                    {`${moment(date).format('H:mm')}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showTimepicker}
                >
                  <Text style={styles.dateTimePickerText}>
                    {`${date.getHours()}:${date.getMinutes()}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.text}>Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={price => {
                setAmount(price);
              }}
              value={amount.toString()}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.text}>From Account</Text>
            <RNPickerSelect
              onValueChange={value => {
                if (value) {
                  setFromAccount(value);
                }
              }}
              items={accountData}
              placeholder={{
                label: props.route.params.transferObj.tFName
              }}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.text}>To Account</Text>
            <RNPickerSelect
              onValueChange={value => {
                if (value) {
                  setToAccount(value);
                }
              }}
              items={accountData}
              placeholder={{
                label: props.route.params.transferObj.tTName
              }}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={name => {
                setName(name);
              }}
              value={name}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={saveData}
            >
              <Text style={styles.buttonText}>
                EDIT TRANSFER
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={DeleteData}
            >
              <Text style={styles.buttonText}>
                DELETE TRANSFER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:
      (Dimensions.get('window').width * 5) / 100,
    paddingTop: (Dimensions.get('window').height * 2) / 100
  },
  content: {
    marginVertical:
      (Dimensions.get('window').height * 1) / 100,
    borderBottomWidth: 1,
    borderBottomColor: Color.subGrayColor
  },
  Datecontent: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: (Dimensions.get('window').width * 4) / 100,
    color: Color.grayColor,
    letterSpacing: 0.5
  },
  input: {
    marginTop: (Dimensions.get('window').height * 1) / 100,
    alignContent: 'center',
    height: (Dimensions.get('window').height * 5) / 100,
    fontSize: (Dimensions.get('window').width * 4) / 100
  },
  dateTimePickerText: {
    fontSize: (Dimensions.get('window').width * 5) / 100
  },
  buttonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primaryColor,
    height: (Dimensions.get('window').height * 5) / 100,
    borderRadius: 10,
    marginTop: (Dimensions.get('window').height * 3) / 100
  },
  buttonText: {
    color: Color.subPrimaryColor,
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => {
  return {
    accounts: state.AccountReducer.accountList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPrice: (id, price) =>
      dispatch(addAccountPrice(id, price)),
    subPrice: (id, price) =>
      dispatch(subAccountPrice(id, price)),
    editTransfer: obj => dispatch(editTransfer(obj)),
    deleteTransfer: id => dispatch(deleteTransfer(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTransferScreen);
