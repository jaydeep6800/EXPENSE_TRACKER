import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tracker.db");

db._db.exec(
  [{ sql: "PRAGMA foreign_keys = ON;", args: [] }],
  false,
  () => {}
);

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS accounts (accountId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, date TEXT NOT NULL,isDeleted TEXT NOT NULL );",
        [], // argumemnts ....
        () => {
          resolve();
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS categories (categoryId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL,isDeleted TEXT NOT NULL );",
        [], // argumemnts ....
        () => {
          resolve();
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS trans (transId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, price REAL NOT NULL, date TEXT NOT NULL, accountId INTEGER, categoryID INTEGER, FOREIGN KEY (accountId) REFERENCES accounts(accountId), FOREIGN KEY (categoryID) REFERENCES categories(categoryID));",
        [], // argumemnts ....
        () => {
          resolve();
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS transfers (tranferId INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, transferfrom INTEGER NOT NULL, transferto INTEGER NOT NULL, price REAL NOT NULL, date TEXT NOT NULL);",
        [], // argumemnts ....
        () => {
          resolve();
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const insertAccount = (name, price, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO accounts (name,price,date,isDeleted) VALUES (?, ?, ?, ?);`,
        [name, price, date, "false"],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const insertCategory = (name, type, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO categories (name,type,date,isDeleted) VALUES (?, ?, ?, ?);`,
        [name, type, date, "false"],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const insertTran = (
  name,
  type,
  price,
  date,
  accountId,
  categoryId
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO trans (name,type,price,date,accountId,categoryId) VALUES (?, ?, ?, ?, ?, ?);`,
        [name, type, price, date, accountId, categoryId],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const insertTransfer = (
  name,
  transferfrom,
  transferto,
  price,
  date
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transfers (name,transferfrom,transferto,price,date) VALUES (?, ?, ?, ?, ?);`,
        [name, transferfrom, transferto, price, date],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const fetchTransfer = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM transfers",
        [],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const fetchTrans = (type) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT t.transId,t.name,t.type,t.price,t.date,t.accountId AS accountId,t.categoryId AS categoryId,c.name AS cname,a.name AS aname FROM trans t LEFT JOIN categories c on t.categoryId = c.categoryId LEFT JOIN accounts a on a.accountId = t.accountId where t.type=?;",
        [type],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const fetchAllAccounts = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM accounts",
        [],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const fetchAccounts = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM accounts where isDeleted=?",
        ["false"],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const updateTransfer = (
  id,
  name,
  transferfrom,
  transferto,
  price,
  date
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE transfers SET name=?,transferfrom=?,transferto=?,price=?,date=? WHERE tranferId=?;`,
        [name, transferfrom, transferto, price, date, id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const deleteTransfer = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM transfers WHERE tranferId=?;`,
        [id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const updateTran = (
  id,
  name,
  type,
  price,
  date,
  accountId,
  categoryId
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE trans SET name=?,type=?,price=?,date=?,accountId=?,categoryId=? WHERE transId=?;`,
        [
          name,
          type,
          price,
          date,
          accountId,
          categoryId,
          id,
        ],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const addAccountPrice = (id, price) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE accounts SET price=price+? WHERE accountId=?  `,
        [price, id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};
export const subAccountPrice = (id, price) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE accounts SET price=price-? WHERE accountId=?  `,
        [price, id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const updateAccount = (id, name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE accounts SET name=? WHERE accountId=?  `,
        [name, id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const deleteTrans = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM trans WHERE transId=?;`,
        [id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const deleteAccount = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE accounts SET isDeleted=? WHERE accountId=?  `,
        ["true", id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const fetchCategories = (type) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories where type=? AND isDeleted=?",
        [type, "false"],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const fetchAllCategories = (type) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories where type=?",
        [type],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const updateCategory = (id, name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE categories SET name=? WHERE categoryId=?`,
        [name, id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const deleteCategory = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE categories SET isDeleted=? WHERE categoryId=?`,
        ["true", id],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};

export const getSalaryCategoryWise = (type) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT categoryId, SUM(price) as total FROM trans WHERE type=? GROUP BY categoryId;`,
        [type],
        (_, result) => {
          resolve(result);
        }, // success function ...
        (_, err) => {
          reject(err);
        } // Failure Function ...
      );
    });
  });
  return promise;
};
