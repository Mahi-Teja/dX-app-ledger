// components/TransactionsList.jsx  

import TransactionTable from "./TxnWrapper2";

export const TransactionsList = ({ transactions, title, customClass = "" }) => {
  return (
    <section
      className={`flex-1 bg-white mb-14 md:mb-0 rounded-2xl shadow-md flex flex-col overflow-hidden ${customClass}`}
    >
      {/* Header */}
      {title && (
        <header className="sticky flex justify-between top-0 z-10 bg-indigo-50   px-4 py-3 text-center md:text-left text-sm sm:text-base md:text-lg font-medium text-indigo-900">
          {title}
          <section>filters</section>
        </header>
      )}

      {/* Transactions */}
      <TransactionTable transactions={transactions} />
    </section>
  );
};

export default TransactionsList;
