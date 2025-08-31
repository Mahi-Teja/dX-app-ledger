import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPES } from "../utils/constants";
import EmojiSelector from "../components/EmojiPicker";
import { AddAccountModel } from "../components/AddAccount";

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
            <AddAccountModel
              toggleOpen={toggleOpen}
              setOpenAddAcc={setOpenAddAcc}
            />
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
  const navigate = useNavigate();

  return (
    <li
      key={account?.id}
      className="grid border  grid-cols-5 justify-between bg-[#fff]  gap-3 px-3 rounded-lg shadow-md p-3 my-2 hover:shadow-lg transition-shadow duration-300  "
    >
      <div className="col-span-2 cursor-pointer flex items-center  justify-start gap-3">
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
          className="p-1 m-0.5 rounded cursor-pointer"
          onClick={(e) => handleEdit(e, account)}
        >
          {FreeIcons.edit}
        </button>
        <button
          className="p-1 m-0.5 rounded cursor-pointer"
          onClick={() => {
            setOpenPopUp(true);
          }}
        >
          {FreeIcons.delete}
        </button>
        {/* <button
          className="p-1 m-0.5 rounded cursor-pointer"
          onClick={() => navigate(`/accounts/${account.id}`)}
        >
          {FreeIcons.verticalThreeDots}
        </button> */}
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
      <section className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Editing {editDetails?.name} Account
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={editFields.name || ""}
            onChange={updateOnChange}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            placeholder="Enter name"
          />
        </div>

        {/* Account Type Dropdown */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm text-gray-600 mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            required
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              updateOnChange(e);
            }}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
          >
            {ACCOUNT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Balance Input */}
        <div className="mb-6">
          <label htmlFor="balance" className="block text-sm text-gray-600 mb-1">
            Balance
          </label>
          <input
            id="balance"
            type="number"
            name="balance"
            value={editFields.balance}
            onChange={updateOnChange}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            placeholder="Enter balance"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <CustomButton1 variant="danger" hanleClick={handleEdit}>
            Save
          </CustomButton1>
          <CustomButton1 variant="safe" hanleClick={handleCancel}>
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
    dispatch(deleteAccount(acc));
  };
  return (
    <Model>
      <section className="bg-white p-6   rounded flex flex-col items-center shadow-2xl">
        <section className="font-semibold mb-2">
          Are you sure you want to delete?
        </section>

        <div className="text-sm text-center mb-4">
          This action cannot be undone. This will permanently delete the Account
        </div>
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
