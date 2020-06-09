import React, { useState, useEffect } from 'react';
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
import { addTrans } from '../../redux/actions/Trans';
import {
  subAccountPrice,
  addAccountPrice
} from '../../redux/actions/Account';

import RNPickerSelect from 'react-native-picker-select';

import DateTimePicker from '@react-native-community/datetimepicker';

const TransIncomeModal = props => {
  const [TransData, setTransData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  const [date, setDate] = useState(props.transObj.date);
  const [amount, setAmount] = useState(
    props.transObj.price
  );
  const [category, setCategory] = useState(0);
  const [account, setAccount] = useState(0);
  const [name, setName] = useState(props.transObj.name);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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

  const saveAndCloseModal = async () => {
    // if (
    //   AcName === '' ||
    //   AcBalance === '' ||
    //   isNaN(AcBalance)
    // ) {
    //   if (isNaN(AcBalance)) {
    //     await Alert.alert(
    //       'FAILED',
    //       `Initial Balance must be number.`,
    //       [
    //         {
    //           text: 'OK',
    //           onPress: () => {}
    //         }
    //       ],
    //       { cancelable: false }
    //     );
    //   } else {
    //     await Alert.alert(
    //       'FAILED',
    //       `Please fill all details ...`,
    //       [
    //         {
    //           text: 'OK',
    //           onPress: () => {}
    //         }
    //       ],
    //       { cancelable: false }
    //     );
    //   }
    // } else {
    //   await props.add(
    //     AcName,
    //     AcBalance,
    //     new Date().toString()
    //   );
    //   await props.toggleModal();
    // }
  };

  return (
    <Modal
      isVisible={props.state}
      onBackdropPress={props.toggleModal}
    >
      <View style={styles.container}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity onPress={props.toggleModal}>
          <Icon style={styles.icon} name="window-close" />
        </TouchableOpacity>
        <Text style={styles.headText}>
          {props.transObj.type}
        </Text>
        <View style={styles.content}>
          <Text style={styles.text}>Date</Text>
          <View style={styles.Datecontent}>
            <View style={{ ...styles.input, flex: 1 }}>
              <TouchableOpacity onPress={showDatepicker}>
                <Text style={styles.dateTimePickerText}>
                  {`${date.getDate()}/${date.getMonth() +
                    1}/${date.getFullYear()}`}
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
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Category</Text>
          <RNPickerSelect
            onValueChange={value => setCategory(value)}
            items={incomeData}
            placeholder={{}}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Account</Text>
          <RNPickerSelect
            onValueChange={value => setAccount(value)}
            items={accountData}
            placeholder={{}}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => {
              setName(name);
            }}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={saveData}
          >
            <Text style={styles.buttonText}>
              ADD INCOME
            </Text>
          </TouchableOpacity>
        </View>
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
      (Dimensions.get('window').height * 1) / 100
  },
  headText: {
    color: Color.secondaryColor,
    fontSize: (Dimensions.get('window').width * 5) / 100,
    marginTop: (Dimensions.get('window').height * 2) / 100,
    textAlign: 'center',
    fontWeight: 'bold'
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

const mapStateToProps = state => {
  return {
    accounts: state.AccountReducer.accountList,
    category: state.CategoryReducer.IncomecategoryList,
    IncomeList: state.TransReducer.IncomeTransList,
    ExpenseList: state.TransReducer.ExpenseTransList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrans: obj => dispatch(addTrans(obj)),
    addPrice: (id, price) =>
      dispatch(addAccountPrice(id, price)),
    subPrice: (id, price) =>
      dispatch(subAccountPrice(id, price))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransIncomeModal);
