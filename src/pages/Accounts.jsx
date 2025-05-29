import React, { useState } from "react";
// import data from "../../dummy.json";
import Nav from "../components/Nav";
import { Button1 } from "../components/button1";
import { Model } from "../components/Model";
import { useDispatch, useSelector } from "react-redux";
import {
  addaccount,
  deleteAccount,
  updateAccount,
} from "../app/state/state.accounts";
import { AccountIcons, FreeIcons } from "../utils/icons";
import { CustomButton1 } from "../components/buttons/CustomButton1";
import EmptyFieldText from "../components/EmptyFieldText";

const AddAccount = ({ toggleOpen, setOpenAddAcc }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("cash");
  const [fields, setFields] = useState({});

  const handleAddAccount = () => {
    if (!fields.type || !fields.name || isNaN(fields.balance))
      return alert("All fields required");
    // const dataTemp = data.accounts.push(fields);

    dispatch(addaccount(fields));

    setFields({});
    setOpenAddAcc(true);
  };
  // console.log(fields);

  const updateFields = (e) => {
    setFields((pre) => ({
      ...pre,
      type: selectedValue,
      id: Date.now().toString(),
    }));

    if (e.target.id == "balance")
      setFields((pre) => ({
        ...pre,
        balance: Number(e.target.value),
      }));
    else if (e.target.id == "accType")
      setFields((pre) => ({ ...pre, type: e.target.value }));
    else if (e.target.id == "accName")
      setFields((pre) => ({ ...pre, name: e.target.value }));
  };
  return (
    <Model setState={toggleOpen}>
      <section className="flex justify-center items-center rounded-lg relative  p-8 bg-[#fff]  ">
        <section className="flex flex-col">
          <div className="shadow-md rounded-lg p-6 lg:w-98">
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
              autoFocus={true}
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
            <select
              required
              name="accType"
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
                setFields((pre) => ({ ...pre, type: e.target.value }));
              }}
              className="p-3 m-1 rounded border bg-white text-black"
            >
              <option value="cash">Cash</option>
              <option value="wallet">Wallet</option>
              <option value="credit_card">Credit Card</option>
              <option value="savings">Savings</option>
              <option value="salary_acc">Salary Account</option>
            </select>
          </div>

          <Button1 handleClick={handleAddAccount}>Add</Button1>
        </section>
      </section>
    </Model>
  );
};

const Accounts = () => {
  const userAccounts = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.user);
  const [openAddAcc, setOpenAddAcc] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState({});

  const toggleOpen = () => setOpenAddAcc((pre) => !pre);

  const clickEdit = (e, acc) => {
    setOpenEdit(true);
    setEditDetails(acc);
  };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditDetails((prev) => ({ ...prev, [name]: value }));
  // };
  // const handleDelete = () => {};
  return (
    // container
    <section className="   m-0 w-full ">
      {/*  */}
      <section className="   ">
        {/*^^ to center all this section is used ^^*/}
        {/* vv Text and Add button vv */}
        <div className=" flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold  ">Accounts</h1>
          <Button1
            className={"w-[25%] lg:w-auto flex justify-center items-center"}
            handleClick={toggleOpen}
          >
            Add {FreeIcons.add}
          </Button1>
        </div>
        <div className="     lg:pb-3 overflow-auto rounded-lg px-6 h-[78vh] inset-shadow-black  relative">
          {/* Add New Account */}
          {!openAddAcc && (
            <AddAccount toggleOpen={toggleOpen} setOpenAddAcc={setOpenAddAcc} />
          )}

          {/* Edit popup */}
          {openEdit && (
            <EditDetailsComp
              editDetails={editDetails}
              toggleEdit={setOpenEdit}
            />
          )}
          {/* User Accounts */}
          <ul className="space-y-4 overflow-auto pb-6 h-full">
            {userAccounts.length > 0 ? (
              userAccounts?.map((account, i) => {
                return (
                  <AccountListItem
                    key={i}
                    account={account}
                    handleEdit={clickEdit}
                    setOpenPopUp={setOpenPopUp}
                  />
                );
              })
            ) : (
              <EmptyFieldText>No Accounts to show, Add one</EmptyFieldText>
            )}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Accounts;

const AccountListItem = ({ account, handleEdit }) => {
  const { user } = useSelector((state) => state.user);
  const [openPopUp, setOpenPopUp] = useState(false);

  return (
    <li
      key={account?.id}
      className="grid grid-cols-5 justify-between bg-[#fff]  gap-3 px-3 rounded-lg shadow-md p-3 my-2 hover:shadow-lg transition-shadow duration-300  "
    >
      <div className="col-span-2 flex items-center  justify-start gap-3">
        <div className="p-1 text-3xl text-[#c45959]">
          {AccountIcons[account?.type]}
        </div>
        <div className="">
          <div className="wrap-anywhere font-semibold text-xs md:text-lg lg:text-xl">
            {account?.name}
          </div>
          <div className="text-sm italic">{account?.type}</div>
        </div>
      </div>
      <div
        className=" col-span-2 p-1 bg-[#c0ffc5] text-[#000000]   flex justify-center items-center   
                  px-4 py-2  rounded-lg font-bold  gap-1
                  "
      >
        <p className="text-2xl">{FreeIcons[user?.currency]} </p>
        <h3 className=" text-sm md:text-lg">{account?.balance}</h3>
      </div>
      {/* Edit and Delete Icons */}
      <div className="col-span-1 flex flex-co p-1 justify-self-end align-middle">
        <button
          className="p-1 m-0.5 rounded"
          onClick={(e) => handleEdit(e, account)}
        >
          {FreeIcons.edit}
        </button>
        <button
          className="p-1 m-0.5 rounded"
          onClick={() => {
            setOpenPopUp(true);
          }}
        >
          {FreeIcons.delete}
        </button>
      </div>
      {/* Delete popup */}
      {openPopUp && (
        <DeleteComp account={account} setOpenState={setOpenPopUp} />
      )}
    </li>
  );
};
const EditDetailsComp = ({ editDetails, toggleEdit }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(editDetails.type);
  const [editFields, setEditFields] = useState(editDetails);
  console.log(editFields);

  const updateOnChange = (e) => {
    const { name, value } = e.target;
    if (name == "balance") {
      setEditFields((pre) => ({ ...pre, [name]: Number(value) }));
    } else {
      setEditFields((pre) => ({ ...pre, [name]: value }));
    }
  };

  const handleEdit = (e) => {
    //dispatch
    const editedAccount = editFields;

    dispatch(updateAccount({ editedAccount }));

    // make an API call

    setEditFields({});
    toggleEdit(false);
  };
  const handleCancel = () => {
    setEditFields({});
    toggleEdit(false);
  };
  return (
    <Model>
      <section className="bg-white p-6   rounded flex flex-col items-center shadow-2xl">
        <div className="font-semibold mb-2">Edit mode</div>
        <p>Not working Yet</p>

        <input
          className="p-3 m-1 rounded border min-w-[50vw] w-full bg-white text-black"
          type="text"
          name="name"
          value={editFields.name || ""}
          onChange={(e) => updateOnChange(e)}
        />

        <select
          required
          name="type"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            updateOnChange(e);
            // updateFields(e);
          }}
          className="p-3 m-1 rounded border w-full bg-white text-black"
        >
          <option value="cash">Cash</option>
          <option value="wallet">Wallet</option>
          <option value="credit_card">Credit Card</option>
          <option value="savings">Savings</option>
          <option value="salary_acc">Salary Account</option>
        </select>
        <input
          className="p-3 m-1 rounded border w-full bg-white text-black"
          type="number"
          name="balance"
          value={editFields.balance}
          onChange={updateOnChange}
        />
        <div className="flex py-2  w-full">
          <CustomButton1 variant={"danger"} hanleClick={handleEdit}>
            Save
          </CustomButton1>
          <CustomButton1 variant={"safe"} hanleClick={handleCancel}>
            Cancel
          </CustomButton1>
        </div>
      </section>
    </Model>
  );
};

const DeleteComp = ({ setOpenState, account }) => {
  const dispatch = useDispatch();
  const handleDelete = (acc) => {
    console.log(acc);
    dispatch(deleteAccount(acc));
  };
  return (
    <Model>
      <section className="bg-white p-6   rounded flex flex-col items-center shadow-2xl">
        <section className="font-semibold mb-2">
          Are you sure you want to delete?
        </section>
        <p>Not working Yet</p>

        <div className="text-sm mb-4">All the data will be lost.</div>
        <div className="flex gap-4">
          <button
            onClick={() => handleDelete(account)}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => setOpenState(false)}
            className="bg-blue-400 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </section>
    </Model>
  );
};
