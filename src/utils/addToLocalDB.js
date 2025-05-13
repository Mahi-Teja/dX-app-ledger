export const addToLocalDB = (updates = {}) => {
  const existingData = JSON.parse(localStorage.getItem("dxData")) || {
    user: {},
    transactions: [],
    accounts: [],
    categories: [],
  };

  const updatedData = {
    user: updates.user || existingData.user,
    transactions: updates.transactions || existingData.transactions,
    accounts: updates.accounts || existingData.accounts,
    categories: updates.categories || existingData.categories,
  };

  localStorage.setItem("dxData", JSON.stringify(updatedData));
};
