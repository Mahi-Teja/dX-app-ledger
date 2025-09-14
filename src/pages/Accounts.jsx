import { useState } from "react";
import { Button1 } from "../components/buttons/button1";
import { useSelector } from "react-redux";
import EmptyFieldText, { EmptyWithAction } from "../components/EmptyFieldText";
import { AddAccountModel } from "../components/accounts/AddAccount";
import { EditDetailsComp } from "../components/accounts/EditAccount";
import { FreeIcons } from "../utils/icons";
import { AccountListItem } from "../components/accounts/AcountListItem";
import { FileX } from "lucide-react";

const Accounts = () => {
  const userAccounts = useSelector((state) => state.accounts);
  const [openAddAcc, setOpenAddAcc] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState({});

  const toggleOpen = () => setOpenAddAcc((prev) => !prev);

  const clickEdit = (e, acc) => {
    setOpenEdit(true);
    setEditDetails(acc);
  };
  if (openAddAcc) {
    return (
      <AddAccountModel
        onClose={setOpenAddAcc}
        onCancel={() => setOpenAddAcc(false)}
      />
    );
  } 
  

  if (userAccounts.length < 1) {
    return (
      <EmptyWithAction
        message="No Accounts created!"
        icon={FileX}
        buttonText="Add Account"
        onClick={() => setOpenAddAcc(true)}
      />
    );
  }
 
  
  return (
    <section className=" w-full h-[calc(100vh-68px)] md:h-[calc(100vh-10px)] flex flex-col px-4 ">
      {/* Header */}
      <header className=" w-full flex justify-between items-center px-4   my-2 rounded-lg bg-white shadow-sm flex-shrink-0">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          My Accounts
        </h2>
        <Button1
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
          handleClick={toggleOpen}
        >
          Add {FreeIcons.add}
        </Button1>
      </header>
      {/* <div className="flex   sm:flex-row items-center justify-between gap-3 px-4 py-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Your Categories
          </h2>
        <Button1
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
          handleClick={toggleOpen}
        >
          Add {FreeIcons.add}
        </Button1>
      </div> */}

      {/* Cards Grid */}
      {/* <div className="  h-[calc(100vh-150px)] md:h-[calc(100vh-60px)] mt-4 md:mt-6 overflow-y-auto pb-6"> */}
      <div className="  h-[calc(100vh-150px)] md:h-[calc(100vh-20px)] mt-4   overflow-y-auto pb-6">
        {openEdit && (
          <EditDetailsComp editDetails={editDetails} toggleEdit={setOpenEdit} />
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 mx-2 lg:grid-cols-3 gap-4">
          {userAccounts.map((account) => (
            <AccountListItem
              key={account.id}
              account={account}
              handleEdit={clickEdit}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Accounts;
