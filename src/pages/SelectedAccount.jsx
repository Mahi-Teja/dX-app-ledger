import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const SelectedAccount = () => {
  const { id ,name} = useParams();
  const navigate = useNavigate();

  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);

  const account = accounts.find((acc) => acc.id === id);
  const [selectedAccount, setSelectedAccount] = useState(account);
  const [txns, setTxns] = useState([]);

  console.log(account);

  // useEffect(() => {
  //   if (!account) {
  //     // Redirect if account doesn't exist
  //     navigate("/404"); // Or another fallback route
  //     return;
  //   }

  //   setSelectedAccount(account);

  //   // Filter transactions based on account name
  //   const relatedTxns = transactions.filter(
  //     (txn) => txn.account === account.name
  //   );
  //   setTxns(relatedTxns);
  // }, [account, transactions]);

  if (!selectedAccount) return null;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Account Overview
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Name:</p>
            <p className="text-lg">{selectedAccount.name}</p>
          </div>
          <div>
            <p className="font-medium">Type:</p>
            <p className="text-lg capitalize">{selectedAccount.type}</p>
          </div>
          <div>
            <p className="font-medium">Balance:</p>
            <p className="text-lg text-green-600">
              ₹ {selectedAccount.balance}
            </p>
          </div>
          <div>
            <p className="font-medium">Initial Balance:</p>
            <p className="text-lg text-gray-600">
              ₹ {selectedAccount.initialBalance}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Transactions ({txns.length})
        </h3>

        {txns.length === 0 ? (
          <p className="text-gray-500">No transactions for this account.</p>
        ) : (
          <ul className="space-y-4">
            {txns.map((txn, idx) => (
              <li
                key={idx}
                className="border p-4 rounded flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="text-md font-medium">{txn.category}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(txn.date).toLocaleDateString()}
                  </p>
                </div>
                <p
                  className={`text-lg font-semibold ${
                    txn.type === "expense" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {txn.type === "expense" ? "-" : "+"} ₹{txn.amount}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SelectedAccount;
