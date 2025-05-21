import { useState } from "react";
import { formatToIndDate } from "../../utils/dates";
import { AccountIcons, CategoryIcons, FreeIcons } from "../../utils/icons";

export const TxnItem = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currDate, setCurrDate] = useState(transaction.date);
  const [dateData, setDateData] = useState();

  return (
    <div
      key={transaction.id}
      onClick={() => {
        setIsOpen((pre) => !pre);
        // console.log(transaction);
      }}
      className={`txn-item  m-2 p-5 shadow-md rounded-lg cursor-pointer   bg-[#fff] ${
        transaction.type === "income"
          ? "border-l-2 border-green-500 hover:bg-[#bef5b9]"
          : "border-l-2 border-red-500   hover:bg-[#e7b3b3]"
      }`}
    >
      <ul className={`flex justify-between  `}>
        {isOpen ? (
          <li title="date">{formatToIndDate(transaction.date)}</li>
        ) : (
          <li title="date">{formatToIndDate(transaction.date)}</li>
        )}
        <li title="description" className="font-semibold">
          {transaction.description}
        </li>

        <li
          title="amaount"
          className={`${
            transaction.type === "income"
              ? " text-[#19f048] hover:text-[#8ced7b]"
              : " text-[#e83326] hover:text-[#dc7979]"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount}
        </li>
      </ul>
      {isOpen && (
        <ul className="flex justify-between ">
          {transaction.category || transaction.account ? (
            <>
              <li title="category">
                {transaction.category}
                {/* {CategoryIcons[transaction.category]} */}
              </li>
              <li title="account">
                {transaction.account}
                {/* {AccountIcons[transaction.account]} */}
              </li>
            </>
          ) : (
            <p className="font-thin italic text-gray-500">
              category/account not selected for this transaction
            </p>
          )}
        </ul>
      )}
    </div>
  );
};
