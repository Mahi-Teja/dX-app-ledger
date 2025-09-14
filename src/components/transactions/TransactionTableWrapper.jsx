import { TransactionItem } from "./TransactionListItem";

export const TransactionTable = ({ transactions = [] }) => { 
  const TableHead = ({ children }) => (
    <section className="sticky  top-0 z-20 text-[10px]   bg-indigo-100  grid-cols-8  grid md:grid-cols-11  items-center   py-1 gap-1  md:text-base font-semibold text-indigo-900">
      {children}
    </section>
  );
  const TableRowHead = ({ lable, customClass }) => (
    <div className={`col-span-1 bor   ${customClass}`}>{lable}</div>
  );
  return (
    <section className="flex-1 rounded-xl  md:text-md bg-white   shadow-md flex flex-col overflow-hidden">
      {/* Table Header */}
      <TableHead>
        {/* <div className="col-span-1 text-center ">Type</div>
        <div className="col-span-1 md:col-span-2 ">Date</div>
        <div className="col-span-2 md:col-span-3  ">Description</div>
        <div className="col-span-1 md:col-span-2 ">Category</div>
        <div className="col-span-1  md:col-span-2 ">Account</div>
        <div className="col-span-1 md:col-span-1 text-right ">Amount</div>
        <div className="col-span-1 md:col-span-1 text-right ">Actions</div> */}
        <TableRowHead lable={"Type"} customClass={" text-center  "} />
        <TableRowHead lable={"Date"} customClass={"   "} />
        <TableRowHead
          lable={"Description"}
          customClass={" col-span-2  md:col-span-3 "}
        />
        <TableRowHead lable={"Category"} customClass={"  md:col-span-2 "} />
        <TableRowHead lable={"Account"} customClass={"  md:col-span-2 "} />
        <TableRowHead lable={"Amount"} customClass={"text-center"} />
        <TableRowHead lable={"Actions"} customClass={"text-center"} />
      </TableHead>
      {/* Transactions */}
      <div className="flex-1  overflow-y-auto bg-indigo-50">
        {transactions?.length > 0 ? (
          transactions.map((txn) => (
            <TransactionItem key={txn.id} transaction={txn} />
          ))
        ) : (
          <p className="text-center py-8 text-gray-500 italic">
            No transactions to show
          </p>
        )}
        <div className="p-8 "></div>
      </div>
    </section>
  );
};

export default TransactionTable;
