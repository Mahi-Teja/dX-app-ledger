import { format } from "date-fns";
import { ArrowRightLeft, ArrowUpRight } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

const Txnstable = () => {
  const transactions = useSelector((s) => s.transactions);

  return (
    <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
      <table className="w-full text-sm text-left text-gray-600">
        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-center">Type</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Account</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {transactions.map((txn) => (
            <tr
              key={txn.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 text-center">
                {txn.type === "self" ? (
                  <ArrowRightLeft className="text-indigo-500 w-5 h-5 mx-auto" />
                ) : (
                  <ArrowUpRight className="text-red-500 w-5 h-5 mx-auto" />
                )}
              </td>
              <td className="px-4 py-3">{format(txn.date, "PP")}</td>
              <td className="px-4 py-3 truncate max-w-[150px]">
                {txn.description || "-"}
              </td>
              <td className="px-4 py-3">{txn?.category?.name || txn.category.category}</td>
              <td className="px-4 py-3">{txn?.account?.name || "NA"}</td>
              <td className="px-4 py-3 text-right font-medium text-gray-800">
                ₹{txn.amount}
              </td>
              <td className="px-4 py-3 text-center">
                <button className="p-1 rounded-full hover:bg-gray-200">
                  <BsThreeDots className="w-5 h-5 text-gray-600" />
                </button>
              </td>
            </tr>
          ))}

          {transactions.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-6 text-center text-gray-400 italic"
              >
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Txnstable;
