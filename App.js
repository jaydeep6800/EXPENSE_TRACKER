import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tracker.db");

db._db.exec(
  [{ sql: "PRAGMA foreign_keys = ON;", args: [] }],
  false,
  () => {}
);

import Navigation from "./Navigation";

export default function App() {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS accounts (accountId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, date TEXT NOT NULL,isDeleted TEXT NOT NULL );"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS categories (categoryId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL,isDeleted TEXT NOT NULL );"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS trans (transId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, price REAL NOT NULL, date TEXT NOT NULL, accountId INTEGER, categoryID INTEGER, FOREIGN KEY (accountId) REFERENCES accounts(accountId), FOREIGN KEY (categoryID) REFERENCES categories(categoryID));"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS transfers (tranferId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, transferfrom INTEGER NOT NULL, transferto INTEGER NOT NULL, price REAL NOT NULL, date TEXT NOT NULL);"
      );
    });
    setIsLoad(true);
  }, []);

  if (!isLoad) {
    return null;
  } else {
    return <Navigation />;
  }
}

const styles = StyleSheet.create({});
