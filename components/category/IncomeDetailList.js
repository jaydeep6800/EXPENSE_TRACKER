import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Redux ...
import { connect } from 'react-redux';
import { deleteCategory } from '../../redux/actions/category';

import { Color } from '../../commons/Color';

const displayList = (
  item,
  toggleModal,
  stateCName,
  stateCId,
  stateToggleDialog
) => {
  const openModal = async (name, id) => {
    await stateCName(name);
    await stateCId(id);
    await toggleModal();
  };
  return (
    <View style={styles.list}>
      <View style={styles.list1}>
        <Text style={styles.text}>{item.item.name}</Text>
      </View>
      <View style={styles.list2}>
        <TouchableOpacity
          onPress={() =>
            openModal(item.item.name, item.item.categoryId)
          }
          style={{
            marginRight:
              (Dimensions.get('window').width * 3) / 100
          }}
        >
          <Text>
            <Icon style={styles.icon} name="pencil" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await stateToggleDialog(item.item.categoryId);
          }}
        >
          <Text>
            <Icon style={styles.icon} name="delete" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const IncomeDetailList = props => {
  const [incomeData, setIncomeData] = useState([]);

  const stateToggleDialog = async id => {
    await Alert.alert(
      'Are you sure?',
      `You can't recever the category once delete.`,
      [
        {
          text: 'CANCEL',
          onPress: () => {}
        },
        {
          text: 'OK',
          onPress: async () => {
            await props.delete(id);
          }
        }
      ]
    );
  };

  useEffect(() => {
    const getData = async () => {
      const Result = await props.category;

      if (await Result) {
        setIncomeData(Result.rows._array);
      }
    };
    getData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.listContainer}>
          <FlatList
            data={incomeData}
            renderItem={item =>
              displayList(
                item,
                props.toggleModal,
                props.stateCName,
                props.stateCId,
                stateToggleDialog
              )
            }
            keyExtractor={item =>
              item.categoryId.toString()
            }
          />
        </View>
      </View>
      <View style={styles.fixedButton}>
        <TouchableOpacity onPress={props.toggleModal}>
          <Icon
            name="plus"
            style={{
              color: Color.subPrimaryColor,
              fontSize:
                (Dimensions.get('window').width * 10) / 100
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.subSecondaryColor
  },
  fixedButton: {
    position: 'absolute',
    bottom: (Dimensions.get('window').width * 10) / 100,
    right: (Dimensions.get('window').width * 10) / 100,
    alignSelf: 'flex-end',
    padding: (Dimensions.get('window').width * 2) / 100,
    borderRadius: 500,
    backgroundColor: Color.primaryColor
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

const mapStateToProps = state => {
  return {
    category: state.CategoryReducer.IncomecategoryList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete: id => dispatch(deleteCategory(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncomeDetailList);
