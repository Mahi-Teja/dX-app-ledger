import txn from "../utils/sample_transactions.json";
import { MONTHS_LIST } from "./constants";

export const getCategoryWiseTotals = (transactions = txn) => {
  // const transactions = txn
  const data = transactions.reduce((acc, transactions) => {
    const catId = transactions.category.id;
    // If this category is not yet in acc, initialize it

    if (!acc[catId]) {
      acc[catId] = {
        category: transactions.category.name,
        income: 0,
        expense: 0,
        net: 0,
      };
    }
    // Add amounts based on type
    if (transactions.type === "income") {
      acc[catId].income += transactions.amount;
    } else if (transactions.type === "expense") {
      acc[catId].expense += transactions.amount;
    } else if (transactions.type === "self") {
      // acc[catId].income += transactions.amount;
      // acc[catId].expense += transactions.amount;
    }

    // Update net
    acc[catId].net = acc[catId].income - acc[catId].expense;

    return acc;
  }, {});

  return Object.values(data);
};

//
// separate Monthly tansactions
// create a total obj
// check if the object has the
// create an Object of [day]:{}

// MonthlyTransactions-------<<<<<
/**
 * Calculate daily totals (income, expense, net) for a given month.
 * @param {number} month - Month index (0 = January, 11 = December)
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} - Sorted array of daily totals with keys: day, inc, exp, net
 */
export const monthlytransactionTotal = (month, transactions = txn) => {
  // 1. Filter transactions that belong to the selected month

  const monthlyTransactions = transactions.filter(
    (tx) => new Date(tx.date).getMonth() === Number(month)
  );

  // 2. Reduce transactions into an object grouped by day
  const dailyTotalsObj = monthlyTransactions.reduce((days, tx) => {
    const day = new Date(tx.date).getDate(); // 1–31

    // Initialize the day if not present
    if (!days[day]) {
      days[day] = { day, income: 0, expense: 0, net: 0 };
    }

    // Add amounts based on transaction type
    if (tx.type === "income") {
      days[day].income += tx.amount;
    } else if (tx.type === "self") {
      // Self-transfer counts as both income and expense
      days[day].income += tx.amount;
      days[day].expense += tx.amount;
    } else {
      // Expense
      days[day].expense += tx.amount;
    }

    // Calculate net for the day
    days[day].net = days[day].income - days[day].expense;

    return days;
  }, {});

  // 3. Convert object to array and sort by day
  const dailyTotalsArray = Object.values(dailyTotalsObj).sort(
    (a, b) => a.day - b.day
  );

  return dailyTotalsArray;
};

//  category wise transactions:-{categoryName:{incc,exp,net}}

//  category wise transactions with Day:-
//  category wise transactions with Week
//  category wise transactions with month
//  category wise transactions with Year

// YearTotal Transactions :
// transactions and year are the inputs
// output - year:[month:{income,expense,net}]
// MonthTotal -> calculate yearly and select the respective month
