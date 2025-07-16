export const accTypeOptions = [
  { name: "Cash", value: "cash" },
  { name: "Cash", value: "Wallet" },
  { name: "Credit Card", value: "credit_card" },
  { name: "Savings", value: "savings" },
  { name: "Salary Account", value: "salary_acc" },
];
export const MONTHS_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const MENU_OPTIONS = [
  { title: "Home", path: "/" },
  { title: "Accounts", path: "/accounts" },
  { title: "Categories", path: "/category" },
  { title: "Budgets", path: "/budgets" },
  { title: "Reports", path: "/reports" },
  { title: "Transactions", path: "/transactions" },
  { title: "Profile", path: "/profile" },
];
export const NO_OF_DAYS_IN_THE_MONTH = (year, month) =>
  new Date(year, month + 1, 0).getDate();

export const ACCOUNT_TYPES = [
  {
    value: "cash",
    name: "Cash",
  },
  {
    value: "credit_card",
    name: "Credit Card",
  },
  {
    value: "debit_card",
    name: "Debit Card",
  },
  {
    value: "savings",
    name: "Savings",
  },
  {
    value: "salary",
    name: "Salary",
  },
  {
    value: "wallet",
    name: "Wallet",
  },
];

export const EMOJIS = [
  // 💰 General Finance
  "💰",
  "💳",
  "🏦",
  "💵",
  "🪙",
  "📈",
  "📉",
  "💲",
  "🧾",

  // 🏠 Personal & Household
  "🏠",
  "🛒",
  "🍽️",
  "🚗",
  "🛏️",
  "🧹",

  // 🧳 Travel & Lifestyle
  "✈️",
  "🎁",
  "🎉",
  "🎮",
  "🏝️",

  // 📚 Learning & Work
  "🧑‍🏫",
  "💼",
  "📚",
  "🧠",

  // 🛠️ Utilities & Services
  "🔌",
  "💡",
  "📱",
  "🧼",

  // ❤️ Health & Safety
  "🏥",
  "💊",
  "🧘‍♂️",
  "🚑",

  // 👨‍👩‍👧‍👦 Family & Kids
  "👶",
  "🧒",
  "🧓",
];
