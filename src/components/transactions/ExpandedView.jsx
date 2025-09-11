import { format, parseISO } from "date-fns";
import { Tag, Wallet, Calendar, StickyNote } from "lucide-react";

const ExpandedView = ({ transaction }) => {
  const isSelf = transaction.type === "self";
  const isIncome = transaction.type === "income";

  const borderColor = isSelf
    ? "border-indigo-400"
    : isIncome
    ? "border-green-400"
    : "border-red-400";

  return (
    <div className={`border-l-4 ${borderColor} bg-gray-100 rounded-b p-3 text-xs sm:text-sm`}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-400" />
          <span>{transaction.category?.name || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-gray-400" />
          <span>
            {isSelf
              ? `${transaction.fromAccount?.name || "—"} → ${
                  transaction.toAccount?.name || "—"
                }`
              : transaction.account?.name || "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>
            {transaction.date ? format(parseISO(transaction.date), "MMM d, yyyy") : "—"}
          </span>
        </div>
        {transaction.description && (
          <div className="flex items-center gap-2 col-span-2">
            <StickyNote className="h-4 w-4 text-gray-400" />
            <span>{transaction.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedView;
