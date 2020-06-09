import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IncomesModals from '../components/category/IncomesModals';
import { Color } from '../commons/Color';
import IncomeDetailList from '../components/category/IncomeDetailList';

const IncomesDetailScreen = ({ navigation }) => {
  const [Modals, SetModals] = useState(false);
  const [CName, SetCName] = useState('');
  const [CId, SetCId] = useState('');

  const stateCId = id => SetCId(id);

  const toggleModal = () => SetModals(!Modals);

  const stateCName = name => SetCName(name);

  return (
    <View style={styles.container}>
      <IncomesModals
        state={Modals}
        toggleModal={toggleModal}
        CName={CName}
        CId={CId}
        stateCId={stateCId}
        stateCName={stateCName}
      />

      <IncomeDetailList
        toggleModal={toggleModal}
        stateCName={stateCName}
        stateCId={stateCId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.subSecondaryColor
  },
  title: {
    fontSize: (Dimensions.get('window').width * 3) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100
  },
  listContainer: {
    backgroundColor: Color.subPrimaryColor,
    borderBottomWidth: 1,
    borderBottomColor: Color.secondaryColor
  },
  list: {
    height: (Dimensions.get('window').height * 5) / 100,
    borderBottomWidth: 0.3,
    borderBottomColor: Color.secondaryColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list1: {
    marginLeft: (Dimensions.get('window').width * 5) / 100
  },
  list2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: (Dimensions.get('window').width * 5) / 100
  },
  icon: {
    fontSize: (Dimensions.get('window').width * 5) / 100,
    marginRight: (Dimensions.get('window').width * 5) / 10,
    color: Color.grayColor
  },
  text: {
    fontSize: (Dimensions.get('window').width * 4) / 100,
    color: Color.grayColor
  }
});

export default IncomesDetailScreen;
