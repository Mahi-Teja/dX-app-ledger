import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  EllipsisVertical,
  ArrowDownFromLine,
  ArrowDownRight,
  ArrowRightLeft,
  ArrowUpRight,
  Ellipsis,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../app/state/state.transactions";
import { format, parseISO } from "date-fns";

import { EditTxn } from "./EditTransaction";
import ExpandedView from "./ExpandedView";
import toast from "react-hot-toast";

export const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const categories = useSelector((state) => state.categories);

  const TxnCategory = categories.find((c) => c.id === transaction.category.id);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const openEdit = () => setIsEditing(true);
  const closeEdit = () => setIsEditing(false);

  const handleDelete = (id) => {
    try {
      dispatch(deleteTransaction({ id }));
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isIncome = transaction.type === "income";
  const isSelf = transaction.type === "self";

  const TableRow = ({ children }) => (
    <div className="grid grid-cols-8  md:grid-cols-11 items-center  gap text-xs sm:text-sm md:text-base">
      {children}
    </div>
  );
  const TableCell = ({ children, customClass, customRef }) => (
    <div
      ref={customRef}
      className={` py-1 px-1 text-wrap md:py-2 col-span-1 ${customClass}`}
    >
      {children}
    </div>
  );
  // GridDate was another version of Transactions Item without tables layout
  // const GridData = () => {
  //   return (
  //     <>
  //       <div className="col-span-1 text-xs md:text-lg  ">
  //         {isSelf ? (
  //           <ArrowRightLeft className="text-indigo-500 mx-auto" />
  //         ) : isIncome ? (
  //           <ArrowDownRight className="text-green-600 mx-auto" />
  //         ) : (
  //           <ArrowUpRight className="text-red-600 mx-auto" />
  //         )}
  //       </div>
  //       <div className="col-span-1 md:col-span-2 text-gray-500">
  //         {transaction.date
  //           ? format(parseISO(transaction.date), "MMM d, yyyy")
  //           : "—"}
  //       </div>
  //       <div className="col-span-2 md:col-span-3  font-semibold text-gray-900 truncate ">
  //         {transaction.description || "No Description"}
  //       </div>
  //       <div className="col-span-1 md:col-span-2 text-center text-gray-700">
  //         {transaction.category?.name || "—"}
  //       </div>
  //       <div className="col-span-1 md:inline text-center md:col-span-2 text-gray-700 truncate">
  //         {isSelf
  //           ? `${transaction.fromAccount?.name || "—"} → ${
  //               transaction.toAccount?.name || "—"
  //             }`
  //           : transaction.account?.name || "—"}
  //       </div>
  //       <div
  //         className={` col-span-1 text-center   font-bold ${
  //           isSelf
  //             ? "text-indigo-600"
  //             : isIncome
  //             ? "text-green-600"
  //             : "text-red-600"
  //         }`}
  //       >
  //         {!isSelf &&
  //           (isIncome ? `+₹${transaction.amount}` : `-₹${transaction.amount}`)}
  //         {isSelf && (
  //           <>
  //             {/* <ArrowRightLeft className="inline text-xs" /> */}
  //             {transaction.amount}
  //           </>
  //         )}
  //       </div>
  //       <div
  //         className=" col-span-1 md:col-span-1 relative flex justify-center "
  //         ref={menuRef}
  //       >
  //         <button
  //           className="p-1 rounded hover:bg-gray-200 transition-colors"
  //           onClick={toggleMenu}
  //         >
  //           <BsThreeDots className="w-5 h-5 text-gray-500" />
  //         </button>

  //         {isMenuOpen && (
  //           <div className="absolute top-5 right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
  //             <button
  //               className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600"
  //               onClick={() => {
  //                 openEdit();
  //                 setIsMenuOpen(false);
  //               }}
  //             >
  //               Edit
  //             </button>
  //             <button
  //               className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
  //               onClick={() => {
  //                 handleDelete();
  //                 setIsMenuOpen(false);
  //               }}
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     </>
  //   );
  // };

  const ActionsMenu = () => (
    <div className="absolute top-5 right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <button
        className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600"
        onClick={() => {
          openEdit();
          setIsMenuOpen(false);
        }}
      >
        Edit
      </button>
      <button
        className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
        onClick={() => {
          handleDelete(transaction.id);
          setIsMenuOpen(false);
        }}
      >
        Delete
      </button>
    </div>
  );
  return (
    <>
      {isEditing && <EditTxn txn={transaction} toggleEdit={closeEdit} />}

      <div
        className="cursor-pointer hover:bg-gray-50 border-b border-gray-200"
        onClick={toggleExpanded}
      >
        {/* Row */}
        <TableRow>
          {/* Type arrorw */}
          <TableCell customClass={"text-xs  text-center md:text-lg"}>
            {isSelf ? (
              <ArrowRightLeft className="text-indigo-500 mx-auto " />
            ) : isIncome ? (
              <ArrowDownRight className="text-green-600 mx-auto " />
            ) : (
              <ArrowUpRight className="text-red-600 mx-auto " />
            )}
          </TableCell>
          {/* date */}
          <TableCell customClass={"md:col-span-1 text-gray-500"}>
            {transaction.date
              ? format(parseISO(transaction.date), "MMM d ")
              : "—"}
          </TableCell>
          {/* description */}
          <TableCell
            customClass={
              "col-span-2 md:col-span-3  font-semibold text-gray-900 truncate  wrap-break-word"
            }
          >
            {transaction.description || "No Description"}
          </TableCell>
          {/* category */}
          <TableCell customClass={" md:col-span-2 flex text-gray-700"}>
            <span className="md: ">{TxnCategory?.Icon || ""}</span>
            <span className="hidden md:flex">
              {TxnCategory?.category || "—"}
            </span>
          </TableCell>
          {/* account */}
          <TableCell customClass={"  md:col-span-2 text-gray-700 truncate"}>
            {isSelf
              ? `${transaction.fromAccount?.name || "—"} → ${
                  transaction.toAccount?.name || "—"
                }`
              : transaction.account?.name || "—"}
          </TableCell>
          {/* amount */}
          <TableCell
            customClass={`  text-center   font-bold ${
              isSelf
                ? "text-indigo-600"
                : isIncome
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {!isSelf &&
              (isIncome
                ? `+₹${transaction.amount}`
                : `-₹${transaction.amount}`)}
            {isSelf && (
              <>
                {/* <ArrowRightLeft className="inline text-xs" /> */}
                {transaction.amount}
              </>
            )}
          </TableCell>
          {/* Actions */}
          <TableCell
            customRef={menuRef}
            customClass={`relative flex justify-center`}
          >
            <button
              className="p-1 rounded hover:bg-gray-200 transition-colors"
              onClick={toggleMenu}
            >
              <Ellipsis className="w-5 h-5 text-gray-500" />
            </button>
            {isMenuOpen && <ActionsMenu />}
          </TableCell>
        </TableRow>

        {/* Expanded details */}
        {isExpanded && <ExpandedView transaction={transaction} />}
      </div>
    </>
  );
};

const ExpandedViewLocal = ({ transaction }) => {
  const isSelf = transaction.type === "self";

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-2 border border-gray-200">
      {/* Top section: Key info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 capitalize">
            {transaction.type}
          </h3>
          <p className="text-sm text-gray-500">
            {transaction.date
              ? format(parseISO(transaction.date), "MMM d, yyyy")
              : "—"}
          </p>
        </div>
        <div
          className={`text-xl font-extrabold ${
            isSelf
              ? "text-indigo-600"
              : transaction.type === "income"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isSelf
            ? `₹${transaction.amount}`
            : transaction.type === "income"
            ? `+₹${transaction.amount}`
            : `-₹${transaction.amount}`}
        </div>
      </div>

      {/* Middle section: accounts + category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 font-medium">Category</p>
          <p className="text-sm text-gray-800">
            {transaction.category?.name || "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Account</p>
          <p className="text-sm text-gray-800 truncate">
            {isSelf
              ? `${transaction.fromAccount?.name || "—"} → ${
                  transaction.toAccount?.name || "—"
                }`
              : transaction.account?.name || "—"}
          </p>
        </div>
      </div>

      {/* Description & notes */}
      {transaction.description && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 font-medium">Description</p>
          <p className="text-sm text-gray-800">{transaction.description}</p>
        </div>
      )}
      {transaction.notes && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 font-medium">Notes</p>
          <p className="text-sm text-gray-800">{transaction.notes}</p>
        </div>
      )}

      {/* Footer: metadata */}
      <div className="border-t pt-2 mt-2 text-xs text-gray-500">
        Created at:{" "}
        {transaction.createdAt
          ? format(parseISO(transaction.createdAt), "PPpp")
          : "—"}
      </div>
    </div>
  );
};
