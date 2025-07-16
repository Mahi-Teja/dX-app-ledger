import { MONTHS_LIST } from "./constants";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

export const getMonthlyTxnAmt = (
  txns,
  month,
  year = new Date().getFullYear()
) => {
  let expense = 0;
  let income = 0;
  txns.forEach((txn) => {
    const txnMonth = new Date(txn.date).getMonth();
    const txnYear = new Date(txn.date).getFullYear();
    // console.log(txnMonth, month);

    if (month == txnMonth && year == txnYear) {
      if (txn.type === "expense") {
        expense += txn.amount;
      }
      if (txn.type === "income") {
        income += txn.amount;
      }
    }
  });

  return {
    Month: MONTHS_LIST[month],
    expense,
    income,
    savings: income - expense,
  };
};

export const getYearGroupedTxns = (txns) => {
  // {
  // year:2025,
  // months:[
  // {
  // month:3,
  // days:[
  //          {
  //          day:12,
  //          txns:[]
  //          },
  //          {
  //          day:13,
  //          txns:[]
  //          },
  //      ]
  // }
  // ]
  // }
  const groupedTxns = [];
  txns.forEach((txn) => {
    const dateObj = new Date(txn.date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth(); // 0-based (0 = Jan)
    const day = dateObj.getDate();

    // ---- YEAR ----
    let yearGroup = groupedTxns.find((y) => y.year === year);
    if (!yearGroup) {
      yearGroup = { year, months: [] };
      groupedTxns.push(yearGroup);
    }

    // ---- MONTH ----
    let monthGroup = yearGroup.months.find((m) => m.month === month);
    if (!monthGroup) {
      monthGroup = { month, days: [] };
      yearGroup.months.push(monthGroup);
    }

    // ---- DAY ----
    let dayGroup = monthGroup.days.find((d) => d.day === day);
    if (!dayGroup) {
      dayGroup = { day, txns: [] };
      monthGroup.days.push(dayGroup);
    }

    // ---- PUSH TXN ----
    dayGroup.txns.push(txn);
  });
  return groupedTxns;
};

export const getAnnualSpendsByMonths = (txns, year = currentYear) => {
  const annualTxns = txns.filter(
    (txn) => new Date(txn.date).getFullYear() == year
  );

  const monthsAndAmount = {};

  annualTxns.forEach((txn) => {
    const txDt = new Date(txn.date);
    const txnMonth = txDt.getMonth();
    const month = MONTHS_LIST[txnMonth];

    if (!monthsAndAmount[MONTHS_LIST[txnMonth]]) {
      monthsAndAmount[MONTHS_LIST[txnMonth]] = {
        expense: 0,
        income: 0,
        self: 0,
        net: 0,
      };
    }
    if (txn.type === "income") {
      monthsAndAmount[MONTHS_LIST[txnMonth]].income += txn.amount;
    }
    if (txn.type === "self") {
      monthsAndAmount[MONTHS_LIST[txnMonth]].self += txn.amount;
    }
    if (txn.type === "expense") {
      monthsAndAmount[MONTHS_LIST[txnMonth]].expense += txn.amount;
    }
    const { income, expense } = monthsAndAmount[MONTHS_LIST[txnMonth]];
    monthsAndAmount[MONTHS_LIST[txnMonth]].net = income - expense;
  });

  return monthsAndAmount;
};

export const getCategoryAndAmount = (transactions = [], categories = []) => {
  // calculate the amount spent in each category of that month
  const categoryAndAmount = {};
  categories.forEach((cat) => {
    // console.log(cat);

    categoryAndAmount[cat.category] = { income: 0, expense: 0, net: 0 };
  });
  transactions.forEach((txn) => {
    // TODO: Check

    // txn.category exists
    if (!txn.category.id) return;
    // txn.amount is a number
    // if category is removed or missing set it to uncategorized

    const key = categoryAndAmount[txn.category.name]
      ? txn.category.name
      : "uncategorized";

    // txn.type is either "income" or "expense" what to do for 'self'
    if (!categoryAndAmount[key]) {
      categoryAndAmount["uncategorized"] = { income: 0, expense: 0, net: 0 };
    }

    if (txn.type === "income") {
      categoryAndAmount[key].income += txn.amount;
    }
    if (txn.type === "expense") {
      categoryAndAmount[key].expense += txn.amount;
    }

    const { income, expense } = categoryAndAmount[key];
    categoryAndAmount[key].net = income - expense;
  });

  return categoryAndAmount;
};

export const getDaywiseAmountOfAMonth = (
  txns,
  month = currentMonth,
  year = currentYear
) => {
  const MonthName = MONTHS_LIST[month];
  let dayAndAmount = {};
  // TODO: also add TotalMonth income, expense

  txns.forEach((txn) => {
    const td = new Date(txn.date);
    const txnYear = td.getFullYear();
    const txnMonth = td.getMonth();
    const day = td.getDate().toString();

    if (txnYear == year && txnMonth == month) {
      if (!dayAndAmount[day]) {
        dayAndAmount[day] = { net: 0, income: 0, expense: 0 };
      }

      if (txn.type === "income") {
        dayAndAmount[day].net += txn.amount;
        dayAndAmount[day].income += txn.amount;
      }
      if (txn.type === "expense") {
        dayAndAmount[day].net -= txn.amount;
        dayAndAmount[day].expense += txn.amount;
      }
    }
  });

  return dayAndAmount;
};

export const getCategoryWiseTxnWrtMonth = (
  categories,
  txns,
  month,
  year = new Date().getFullYear()
) => {
  // if no categories or transactions given early return
  if (categories.length < 1 && txns.length < 1) return;

  // get the txns of that month and year
  const monthlyTxns = txns.filter((txn) => {
    // format the txn.date to useful type
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === year && txnDate.getMonth() === month;
  });

  // calculate the amount spent in each category of that month
  const categoryAmount = getCategoryAndAmount(monthlyTxns, categories);

  return categoryAmount;
  //  {categoryName:{income,expense,net} }
};

export const categoryWiseTxnWrtDay = (
  txns,
  categories,
  day,
  month = currentMonth,
  year = currentYear
) => {};

export const categoryWiseTxnWrtYear = (
  txns,
  categories,
  year = currentYear
) => {
  // get the txns of that month and year
  const annualTxns = txns.filter((txn) => {
    // format the txn.date to useful type
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === year;
  });
  // calculate the amount spent in each category of that month

  const categoryAmount = getCategoryAndAmount(annualTxns, categories);

  return categoryAmount;
};
