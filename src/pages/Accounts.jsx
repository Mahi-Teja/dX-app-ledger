import React, { useEffect, useState } from "react";
// import data from "../../dummy.json";
import Nav from "../components/Nav";
import { Button1 } from "../components/button1";
import { Model } from "../components/Model";
import { useDispatch, useSelector } from "react-redux";
import { addToLocalDB } from "../utils/addToLocalDB";
import { addaccount } from "../app/state/state.accounts";

const Accounts = ({}) => {
  const data = JSON.parse(localStorage.getItem("dxData"));
  const userAccounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const [accData, setAccData] = useState(
    JSON.parse(localStorage.getItem("dxData")).accounts
  );
  const [openAddAcc, setOpenAddAcc] = useState(true);
  const [fields, setFields] = useState({});
  const toggleOpen = () => setOpenAddAcc((pre) => !pre);

  const updateFields = (e) => {
    if (e.target.id == "balance")
      setFields((pre) => ({
        ...pre,
        balance: e.target.value,
      }));
    else if (e.target.id == "accType")
      setFields((pre) => ({ ...pre, type: e.target.value }));
    else if (e.target.id == "accName")
      setFields((pre) => ({ ...pre, name: e.target.value }));
  };

  const handleAddAccount = (e) => {
    if (!fields.type || !fields.name || !fields.balance)
      return alert("All fields required");
    // const dataTemp = data.accounts.push(fields);

    dispatch(addaccount(fields));

    setAccData((pre) => [...pre, fields]);
    setFields({});
    setOpenAddAcc(true);
    // data?.accounts?.push(fields);
    // localStorage.setItem("data", JSON.stringify(data));
  };
  return (
    <section className="h-screen bg-gray-100">
      {/* <Nav   /> */}

      <section className="flex flex-col items-center justify-center my-10 ">
        <h1 className="text-2xl font-bold mb-4">Accounts</h1>
        <div className="bg-[#3e3e3e] shadow-md rounded-lg p-6 w-96">
          <div className="flex  justify-center">
            <h2 className="text-xl    font-semibold mb-4">
              {data?.accounts?.length > 0
                ? "Account Details"
                : "No Accounts, add one"}
            </h2>
            {!openAddAcc && (
              <Model>
                <section className="flex flex-col relative  p-5 bg-blue-500">
                  <div className="shadow-md rounded-lg p-6 w-96">
                    <h2 className="text-xl bold  text-center">Add Account</h2>
                    <button
                      onClick={toggleOpen}
                      className="absolute cursor-pointer  top-3 right-5"
                    >
                      X
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <input
                      onChange={(e) => updateFields(e)}
                      className="p-3 m-1 rounded border "
                      type="text"
                      id="accType"
                      list="accTypes"
                      placeholder="Accont Type"
                    />
                    <datalist id="accTypes">
                      <option value="Card" />
                      <option value="cash" />
                      <option value="Savings" />
                    </datalist>
                    <input
                      onChange={(e) => updateFields(e)}
                      className="p-3 m-1 rounded border "
                      type="text"
                      id="accName"
                      placeholder="Account Name"
                    />
                    <input
                      onChange={(e) => updateFields(e)}
                      className="p-3 m-1 rounded border "
                      type="Number"
                      id="balance"
                      placeholder="Balance"
                    />
                  </div>
                  <button
                    onClick={(e) => handleAddAccount(e)}
                    className={`bg-blue-600 my-1 p-2 `}
                  >
                    Add
                  </button>
                </section>
              </Model>
            )}
          </div>
          <ul className="space-y-4">
            {userAccounts?.map((account) => {
              return (
                <li key={account.id} className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={account.icon}
                      alt="account_icon"
                      className="w-8 h-8 mr-2"
                    />
                    <div className="">
                      <div>{account.name}</div>

                      <div>{account.type}</div>
                    </div>
                  </div>
                  <span>${account.balance}</span>
                  <button>Edit</button>
                  <button>Delete</button>
                </li>
              );
            })}
          </ul>
          <Button1
            className={"w-3/4 my-1 block mx-auto"}
            handleClick={toggleOpen}
          >
            Add
          </Button1>
        </div>
      </section>
    </section>
  );
};

export default Accounts;
