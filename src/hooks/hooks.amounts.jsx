import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCalculatedAmount = () => {
  const categories = useSelector((state) => state.categories);
  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);

  //   category List => list of unique Categories
  const catList = categories.map((c) => c.category);
  //   Accounts List => list of unique Acc Names(acc types can be saving/card for multiple accounts )
  const accListforNames = accounts.map((acc) => acc.name);
  //   Accounts List => list of unique Acc Names(acc types can be saving/card for multiple accounts )
  //   const accListforTypes = accounts.map((acc) => acc.type);

  let finalCatergoryAmout = {};
  let finalAccountsAmout_Names = {};
  //   const catTxns = accList.forEach((cat) => {
  //     let am = 0;
  //     console.log(cat);

  //     transactions.forEach((element) => {
  //       console.log(element.name);

  //       if (cat == element.account) {
  //         if (element.type == "income") {
  //           am += Number(element.amount);
  //         } else if (element.type == "expense") {
  //           am -= Number(element.amount);
  //         }
  //       }
  //     });
  //     finalAccountsAmout[cat] = am;
  //   });

  const calcAmt = (txns, subjectlist, subject, finalObj) => {
    subjectlist.forEach((cat) => {
      let am = 0;
      txns.forEach((element) => {
        if (cat == element[subject]) {
          if (element.type == "income") {
            am += Number(element.amount);
          } else if (element.type == "expense") {
            am -= Number(element.amount);
          }
        }
      });
      finalObj[cat] = am;
    });
    return finalObj;
  };

  // Categories calculate by matching transaction.category
  calcAmt(transactions, catList, "category", finalCatergoryAmout);
  // Accounts calculate by matching transaction.account
  calcAmt(transactions, accListforNames, "account", finalAccountsAmout_Names);

  return { finalCatergoryAmout, finalAccountsAmout_Names };
};

export default useCalculatedAmount;
