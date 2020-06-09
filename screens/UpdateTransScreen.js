import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Color } from '../commons/Color';

//Redux ...
import { connect } from 'react-redux';
import {
  editTrans,
  deleteTrans
} from '../redux/actions/Trans';
import {
  addAccountPrice,
  subAccountPrice
} from '../redux/actions/Account';

import moment from 'moment';

import RNPickerSelect from 'react-native-picker-select';

import DateTimePicker from '@react-native-community/datetimepicker';
import TransAddTitleBar from '../components/trans/TransAddTitleBar';
import StatusBar from '../components/StatusBar';

const UpdateTransScreen = props => {
  const [incomeData, setIncomeData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const Result = await props.accounts;
      const Result2 = await props.category;

      if (await Result) {
        const data = Result.rows._array;
        await data.forEach(function(element) {
          element.value = element.accountId.toString();
          element.label = `${element.name}   ($ ${element.price}) `;
        });
        await setAccountData(data);
      }

      if (await Result2) {
        const data = Result2.rows._array;
        await data.forEach(function(element) {
          element.value = element.categoryId.toString();
          element.label = element.name;
        });
        await setIncomeData(data);
      }
    };
    getData();
  });

  const [date, setDate] = useState(
    moment(props.route.params.TransObj.date).format()
  );
  const [amount, setAmount] = useState(
    props.route.params.TransObj.price
  );
  const [category, setCategory] = useState(
    props.route.params.TransObj.categoryId
  );
  const [account, setAccount] = useState(
    props.route.params.TransObj.accountId
  );
  const [name, setName] = useState(
    props.route.params.TransObj.name
  );
  const [type, setType] = useState(
    props.route.params.TransObj.type
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
      account === '' ||
      category === '' ||
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
    } else {
      if (type === 'income') {
        await props.subPrice(
          props.route.params.TransObj.accountId,
          props.route.params.TransObj.price
        );
        await props.editTrans({
          id: props.route.params.TransObj.transId,
          name: name,
          type: 'income',
          price: amount,
          date: date.toString(),
          accountId: account,
          categoryId: category
        });
        await props.addPrice(account, amount);
      } else if (type === 'expense') {
        await props.addPrice(
          props.route.params.TransObj.accountId,
          props.route.params.TransObj.price
        );
        await props.editTrans({
          id: props.route.params.TransObj.transId,
          name: name,
          type: 'expense',
          price: amount,
          date: date.toString(),
          accountId: account,
          categoryId: category
        });
        await props.subPrice(account, amount);
      }

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
    if (type === 'income') {
      await Alert.alert(
        'Are you sure?',
        `You can't restore the Transacton once deleted.`,
        [
          {
            text: 'CANCEL',
            onPress: () => {}
          },
          {
            text: 'OK',
            onPress: async () => {
              await props.subPrice(
                props.route.params.TransObj.accountId,
                props.route.params.TransObj.price
              );
              await props.deleteTrans(
                props.route.params.TransObj.transId
              );

              await props.navigation.goBack();
            }
          }
        ]
      );
    } else if (type === 'expense') {
      await Alert.alert(
        'Are you sure?',
        `You can't restore the Transacton once deleted.`,
        [
          {
            text: 'CANCEL',
            onPress: () => {}
          },
          {
            text: 'OK',
            onPress: async () => {
              await props.addPrice(
                props.route.params.TransObj.accountId,
                props.route.params.TransObj.price
              );
              await props.deleteTrans(
                props.route.params.TransObj.transId
              );
              await props.navigation.goBack();
            }
          }
        ]
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <TransAddTitleBar
        Text={`EDIT ${type.toUpperCase()}`}
        navigation={props.navigation}
      />
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
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
                    {`${moment(date).format(
                      'MMM DD YYYY'
                    )}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showTimepicker}
                >
                  <Text style={styles.dateTimePickerText}>
                    {`${moment(date).format('H:mm')}`}
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
              value={amount.toString()}
              onChangeText={price => {
                setAmount(price);
              }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>Category</Text>
            <RNPickerSelect
              onValueChange={value => {
                if (value) {
                  setCategory(value);
                }
              }}
              items={incomeData}
              placeholder={{
                label: props.route.params.TransObj.cname
              }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>Account</Text>
            <RNPickerSelect
              onValueChange={value => {
                if (value) {
                  setAccount(value);
                }
              }}
              items={accountData}
              placeholder={{
                label: props.route.params.TransObj.aname
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
                {`EDIT ${type.toUpperCase()}`}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={DeleteData}
            >
              <Text style={styles.buttonText}>
                {`DELETE ${type.toUpperCase()}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
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
    accounts: state.AccountReducer.accountList,
    category: state.CategoryReducer.IncomecategoryList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editTrans: obj => dispatch(editTrans(obj)),
    addPrice: (id, price) =>
      dispatch(addAccountPrice(id, price)),
    subPrice: (id, price) =>
      dispatch(subAccountPrice(id, price)),
    deleteTrans: id => dispatch(deleteTrans(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTransScreen);
