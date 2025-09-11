import { useNavigate } from "react-router-dom";
import { AccountIcons } from "../../utils/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteComp } from "./DeleteAccount";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { CURRENCY_SYMBOLS } from "../../utils/constants";

export const AccountListItem = ({ account, handleEdit }) => {
  const { user } = useSelector((state) => state.user);
  const [openPopUp, setOpenPopUp] = useState(false);
  const navigate = useNavigate();

  return (
    <li className="w-full">
      <div className="flex flex-col justify-between p-4 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition duration-200">
        {/* Header: Icon + Name + Actions */}
        <div className="flex items-start justify-between">
          {/* Left: Icon + Name + Type */}
          <div
            className="flex items-center gap-3 cursor-pointer min-w-0"
            onClick={() => navigate(`/accounts/${account.id}`)}
          >
            <div className="flex-shrink-0 p-2 rounded-xl bg-gray-100 text-2xl text-indigo-600">
              {AccountIcons[account?.type] ?? "💼"}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm md:text-base truncate">
                {account?.name}
              </h3>
              <p className="text-xs text-gray-500">{account?.type}</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-2">
            <button
              className="p-2 rounded-xl hover:bg-gray-100"
              onClick={(e) => handleEdit(e, account)}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-xl hover:bg-gray-100"
              onClick={() => setOpenPopUp(true)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-xl hover:bg-gray-100"
              onClick={() => navigate(`/accounts/${account.id}`)}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Balances */}
        <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white">
          {/* Opening Balance (subtle) */}
          <div className="flex flex-col text-right">
            <p className="text-xs text-gray-400">Opening balance</p>
            <span className={`text-base font-bold ${
                account?.initialBalance >= 0 ? "text-green-700" : "text-red-700"
              }`}>
              {CURRENCY_SYMBOLS[user?.currency?.toUpperCase()] || "₹"}
              {account?.initialBalance}
            </span>
          </div>
          {/* Divider */}
          <div className="h-10 w-px bg-gray-200 mx-6" />

          {/* Current Balance */}
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">Current balance</p>
            <span
              className={`text-base font-bold ${
                account?.balance >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {CURRENCY_SYMBOLS[user?.currency?.toUpperCase()] || "₹"}
              {account?.balance}
            </span>
          </div>
        </div>
      </div>

      {openPopUp && (
        <DeleteComp account={account} setOpenState={setOpenPopUp} />
      )}
    </li>
  );
};
