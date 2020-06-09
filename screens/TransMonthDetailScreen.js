import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Color } from "../commons/Color";

import StatusBar from "../components/StatusBar";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TransAddScreen from "./TransAddScreen";

import moment from "moment";

//Calendar ...
import sprintf from "sprintf";
import calendar from "calendar-month-array";

//Redux ...
import { connect } from "react-redux";
import {} from "../redux/actions/Trans";

import TransScreenTitleBar from "../components/trans/TransScrenTitleBar";

const TransMonthDetailScreen = (props) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentDate, setCurrentDate] = useState(
    moment().format()
  );

  useEffect(() => {
    const getData = async () => {
      const Result = await props.IncomeList;
      const Result2 = await props.ExpenseList;

      if (await Result) {
        var incomeAmount = await 0;
        await setIncomeData(Result.rows._array);
        incomeData.map((obj) => {
          if (
            moment(obj.date).format("M") ===
              moment(currentDate).format("M") &&
            moment(obj.date).format("YYYY") ===
              moment(currentDate).format("YYYY")
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
            moment(obj.date).format("M") ===
              moment(currentDate).format("M") &&
            moment(obj.date).format("YYYY") ===
              moment(currentDate).format("YYYY")
          ) {
            expenseAmount = expenseAmount + obj.price;
          }
        });
        await setTotalExpense(expenseAmount);
      }
    };
    getData();
  });

  var weeks = calendar(
    new Date(
      moment(currentDate).format("YYYY").toString(),
      (moment(currentDate).format("M") - 1).toString()
    ),
    {
      weekStartDay: 0,
      formatHeader: (date) => date.toString().slice(0, 2),
      formatDate: (date) => sprintf("%2d", date.getDate()),
      formatSiblingMonthDate: () => "  ",
    }
  );

  var calData = [];
  const DisplayData = async () => {
    var inc = await 1;
    for (var i = 1; i < weeks.length; i++) {
      for (var j = 0; j < weeks[i].length; j++) {
        await calData.push({
          id: inc,
          value: weeks[i][j],
        });
        await inc++;
      }
    }
  };
  DisplayData();

  const increaseMonth = async () => {
    setCurrentDate(moment(currentDate).add(1, "months"));
  };

  const decreaseMonth = async () => {
    setCurrentDate(
      moment(currentDate).subtract(1, "months")
    );
  };

  const findCurrentDay = async (day) => {
    await setCurrentDate(
      moment(currentDate).set("date", day).format()
    );
    await console.log(currentDate);
  };

  const overview = 0;

  const findOverview = (day) => {
    var iData = 0;
    var eData = 0;

    if (!isNaN(parseInt(day))) {
      const dummyDate = moment(currentDate)
        .set("date", day)
        .format();
      incomeData.map((obj) => {
        if (
          moment(dummyDate).format("D-MM-YYY") ===
          moment(obj.date).format("D-MM-YYY")
        ) {
          // console.log(dummyDate);
          iData = iData + obj.price;
        }
      });
      expenseData.map((obj) => {
        if (
          moment(dummyDate).format("D-MM-YYY") ===
          moment(obj.date).format("D-MM-YYY")
        ) {
          eData = eData + obj.price;
        }
      });
      if (iData - eData === 0) {
        return <Text></Text>;
      } else if (iData - eData >= 0) {
        return (
          <Text style={{ color: Color.greenColor }}>
            {iData - eData}
          </Text>
        );
      } else {
        return (
          <Text style={{ color: Color.redColor }}>
            {iData - eData}
          </Text>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <TransScreenTitleBar Text="Transactions" />

      <View style={styles.monthTitle}>
        <TouchableOpacity onPress={() => decreaseMonth()}>
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
        >
          {`${moment(currentDate).format("MMMM")}  ${moment(
            currentDate
          ).format("YYYY")}`}
        </Text>
        <TouchableOpacity onPress={() => increaseMonth()}>
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
      <View style={styles.dayNameContainer}>
        <Text style={{}}>Sun</Text>
        <Text style={{}}>Mon</Text>
        <Text style={{}}>Tue</Text>
        <Text style={{}}>Wed</Text>
        <Text style={{}}>Thu</Text>
        <Text style={{}}>Fri</Text>
        <Text style={{}}>Sat</Text>
      </View>
      {/* Calendar ... */}
      <FlatList
        style={{ flex: 1 }}
        data={calData}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              await props.navigation.navigate("DayScreen", {
                date: await moment(currentDate)
                  .set("date", item.value)
                  .format(),
              });
            }}
            style={{
              flex: 1,
              height:
                (Dimensions.get("window").height * 14) /
                100,
              borderWidth: 0.2,
              borderColor: Color.subGrayColor,
            }}
          >
            <View>
              <Text
                style={{
                  paddingLeft:
                    (Dimensions.get("window").width * 1) /
                    100,
                }}
              >
                {item.value}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {findOverview(item.value)}
              </View>
            </View>
          </TouchableOpacity>
        )}
        numColumns={7}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.fixedButton}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("TransAdd")
          }
        >
          <Icon
            name="plus"
            style={{
              color: Color.subPrimaryColor,
              fontSize:
                (Dimensions.get("window").width * 10) / 100,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedButton: {
    position: "absolute",
    bottom: (Dimensions.get("window").width * 10) / 100,
    right: (Dimensions.get("window").width * 10) / 100,
    alignSelf: "flex-end",
    padding: (Dimensions.get("window").width * 2) / 100,
    borderRadius: 500,
    backgroundColor: Color.primaryColor,
  },
  dayNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:
      (Dimensions.get("window").width * 4) / 100,
  },
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
  content: { justifyContent: "center" },
});

const mapStateToProps = (state) => {
  return {
    IncomeList: state.TransReducer.IncomeTransList,
    ExpenseList: state.TransReducer.ExpenseTransList,
  };
};

export default connect(
  mapStateToProps,
  null
)(TransMonthDetailScreen);
