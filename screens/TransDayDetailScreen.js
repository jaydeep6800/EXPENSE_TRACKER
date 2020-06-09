import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Color } from "../commons/Color";
import StatusBar from "../components/StatusBar";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment";

//Redux ...
import { connect } from "react-redux";
import TransIncomeModal from "../components/trans/TransIncomeModal";

const TransDayDetailScreen = (props) => {
  const [incomeData, setIncomeData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [date, setDate] = useState(
    moment(props.route.params.date).format()
  );
  var iDataList = [];
  var eDataList = [];
  var tDataList = [];

  const [transModals, SetTransModals] = useState(false);
  const [transferModals, SetTransferModals] = useState(
    false
  );

  const getData = async () => {
    const Result = await props.IncomeList;
    const Result2 = await props.ExpenseList;
    const Result3 = await props.TransferList;
    const Result4 = await props.AccountList;

    if (await Result) {
      var incomeAmount = await 0;
      await setIncomeData(Result.rows._array);
      incomeData.map((obj) => {
        if (
          moment(obj.date).format("D") ===
            moment(date).format("D") &&
          moment(obj.date).format("M") ===
            moment(date).format("M") &&
          moment(obj.date).format("YYYY") ===
            moment(date).format("YYYY")
        ) {
          incomeAmount = incomeAmount + obj.price;
        }
      });
      await setTotalIncome(incomeAmount);
    }

    if (await Result2) {
      var expenseAmount = await 0;
      await setExpenseData(Result2.rows._array);
      expenseData.map((obj) => {
        if (
          moment(obj.date).format("D") ===
            moment(date).format("D") &&
          moment(obj.date).format("M") ===
            moment(date).format("M") &&
          moment(obj.date).format("YYYY") ===
            moment(date).format("YYYY")
        ) {
          expenseAmount = expenseAmount + obj.price;
        }
      });
      await setTotalExpense(expenseAmount);
    }
    if (await Result3) {
      await setTransferData(Result3.rows._array);
    }
    if (await Result4) {
      await setAccountData(Result4.rows._array);
    }
  };
  getData();

  if (incomeData) {
    incomeData.map((obj) => {
      if (
        moment(obj.date).format("D") ===
          moment(date).format("D") &&
        moment(obj.date).format("M") ===
          moment(date).format("M") &&
        moment(obj.date).format("YYYY") ===
          moment(date).format("YYYY")
      ) {
        iDataList.push(obj);
      }
    });
  }

  if (expenseData) {
    expenseData.map((obj) => {
      if (
        moment(obj.date).format("D") ===
          moment(date).format("D") &&
        moment(obj.date).format("M") ===
          moment(date).format("M") &&
        moment(obj.date).format("YYYY") ===
          moment(date).format("YYYY")
      ) {
        eDataList.push(obj);
      }
    });
  }

  if (transferData) {
    transferData.map((obj) => {
      if (
        moment(obj.date).format("D") ===
          moment(date).format("D") &&
        moment(obj.date).format("M") ===
          moment(date).format("M") &&
        moment(obj.date).format("YYYY") ===
          moment(date).format("YYYY")
      ) {
        accountData.map((objj) => {
          if (objj.accountId === obj.transferfrom) {
            obj.tFName = objj.name;
          }
          if (objj.accountId === obj.transferto) {
            obj.tTName = objj.name;
          }
        });
        tDataList.push(obj);
      }
    });
  }

  const increaseDay = async () => {
    setDate(moment(date).add(1, "days"));
  };

  const decreaseDay = async () => {
    setDate(moment(date).subtract(1, "days"));
  };

  const toggleTransModal = () =>
    SetTransModals(!transModals);
  const toggleTransferModal = () =>
    SetTransferModals(!transferModals);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.monthTitle}>
        <TouchableOpacity onPress={decreaseDay}>
          <Icon
            name="chevron-left"
            style={{
              color: Color.subPrimaryColor,

              fontSize:
                (Dimensions.get("window").width * 10) / 100,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Color.subPrimaryColor,
            fontSize:
              (Dimensions.get("window").width * 5) / 100,
          }}
        >{`${moment(date).format("DD")} ${moment(
          date
        ).format("MMMM")}`}</Text>
        <TouchableOpacity onPress={increaseDay}>
          <Icon
            name="chevron-right"
            style={{
              color: Color.subPrimaryColor,
              fontSize:
                (Dimensions.get("window").width * 10) / 100,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.TransTitle}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Income</Text>
          <Text style={{ color: Color.greenColor }}>
            $ {totalIncome}{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Expense</Text>
          <Text style={{ color: Color.redColor }}>
            $ {totalExpense}{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Total</Text>
          <Text
            style={{
              color:
                totalIncome - totalExpense > 0
                  ? Color.greenColor
                  : Color.redColor,
            }}
          >
            $ {totalIncome - totalExpense}{" "}
          </Text>
        </View>
      </View>
      {/* Transaction */}
      <Text
        style={{
          paddingLeft: 10,
          paddingVertical: 5,
          fontSize: 20,
          fontWeight: "bold",
          color: Color.greenColor,
        }}
      >
        Income
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal:
            (Dimensions.get("window").width * 5) / 100,
          borderWidth: 0.2,
          borderColor: Color.subGrayColor,
          height:
            (Dimensions.get("window").height * 5) / 100,
          alignContent: "center",
        }}
      >
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          Bank
        </Text>
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          Category
        </Text>
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          price
        </Text>
      </View>

      <FlatList
        data={iDataList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height:
                (Dimensions.get("window").height * 5) / 100,
              justifyContent: "center",
              borderWidth: 0.2,
              borderColor: Color.subGrayColor,
            }}
            onPress={async () =>
              await props.navigation.navigate(
                "UpdateTransScreen",
                { TransObj: item }
              )
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal:
                  (Dimensions.get("window").width * 5) /
                  100,
              }}
            >
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.aname}
              </Text>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.cname}
              </Text>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                  color: Color.greenColor,
                }}
              >
                + $ {item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.transId.toString()}
      />

      <Text
        style={{
          paddingLeft: 10,
          paddingVertical: 5,
          fontSize: 20,
          fontWeight: "bold",
          color: Color.redColor,
        }}
      >
        Expense
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal:
            (Dimensions.get("window").width * 5) / 100,
          borderWidth: 0.2,
          borderColor: Color.subGrayColor,
          height:
            (Dimensions.get("window").height * 5) / 100,
          alignContent: "center",
        }}
      >
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          Bank
        </Text>
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          Category
        </Text>
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          price
        </Text>
      </View>
      <FlatList
        // style={{ flex: 1 }}
        data={eDataList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height:
                (Dimensions.get("window").height * 5) / 100,
              justifyContent: "center",
              borderWidth: 0.2,
              borderColor: Color.subGrayColor,
            }}
            onPress={async () =>
              await props.navigation.navigate(
                "UpdateTransScreen",
                { TransObj: item }
              )
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal:
                  (Dimensions.get("window").width * 5) /
                  100,
              }}
            >
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.aname}
              </Text>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.cname}
              </Text>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                  color: Color.redColor,
                }}
              >
                - $ {item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.transId.toString()}
      />
      <Text
        style={{
          paddingLeft: 10,
          paddingVertical: 5,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Transfer
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal:
            (Dimensions.get("window").width * 5) / 100,
          borderWidth: 0.2,
          borderColor: Color.subGrayColor,
          height:
            (Dimensions.get("window").height * 5) / 100,
          alignContent: "center",
        }}
      >
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          from
        </Text>
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          to
        </Text>
        <Text
          style={{
            paddingLeft:
              (Dimensions.get("window").width * 1) / 100,
            fontWeight: "bold",
          }}
        >
          price
        </Text>
      </View>
      <FlatList
        // style={{}}
        data={tDataList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height:
                (Dimensions.get("window").height * 5) / 100,
              justifyContent: "center",
              borderWidth: 0.2,
              borderColor: Color.subGrayColor,
            }}
            onPress={async () =>
              await props.navigation.navigate(
                "UpdateTransferScreen",
                { transferObj: item }
              )
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal:
                  (Dimensions.get("window").width * 5) /
                  100,
              }}
            >
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.tFName}
              </Text>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.tTName}
              </Text>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                $ {item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.tranferId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  monthTitle: {
    flexDirection: "row",
    height: (Dimensions.get("window").height * 6) / 100,
    backgroundColor: Color.primaryColor,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Color.subGrayColor,
  },
  TransTitle: {
    flexDirection: "row",
    height: (Dimensions.get("window").height * 8) / 100,
    backgroundColor: Color.subPrimaryColor,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    IncomeList: state.TransReducer.IncomeTransList,
    ExpenseList: state.TransReducer.ExpenseTransList,
    TransferList: state.TransReducer.TransferTransList,
    AccountList: state.AccountReducer.AllAccountList,
  };
};

export default connect(
  mapStateToProps,
  null
)(TransDayDetailScreen);
