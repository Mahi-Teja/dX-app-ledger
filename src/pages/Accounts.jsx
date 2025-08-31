import { useState } from "react";

import { Button1 } from "../components/buttons/button1";
import { useSelector } from "react-redux";
import EmptyFieldText from "../components/EmptyFieldText";

import { AddAccountModel } from "../components/accounts/AddAccount";
import { EditDetailsComp } from "../components/accounts/EditAccount";
import { FreeIcons } from "../utils/icons";
import { AccountListItem } from "../components/accounts/AcountListItem";

const Accounts = () => {
  const userAccounts = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.user);
  const [openAddAcc, setOpenAddAcc] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState({});

  const toggleOpen = () => setOpenAddAcc((prev) => !prev);

  const clickEdit = (e, acc) => {
    setOpenEdit(true);
    setEditDetails(acc);
  };

  return (
    <section className="m-0 w-full">
      <section>
        <div className="flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Accounts</h1>
          <Button1
            className="w-[25%] lg:w-auto flex justify-center items-center"
            handleClick={toggleOpen}
          >
            Add {FreeIcons.add}
          </Button1>
        </div>

        <div className="lg:pb-3 overflow-auto rounded-lg px-6 h-[78vh] inset-shadow-black relative">
          {openAddAcc && (
            <AddAccountModel
              onClose={setOpenAddAcc}
              // onSuccess={(newAcc) => console.log("Added:", newAcc)}
              onCancel={() => setOpenAddAcc(false)}
            />
          )}

          {openEdit && (
            <EditDetailsComp
              editDetails={editDetails}
              toggleEdit={setOpenEdit}
            />
          )}

          <ul className="space-y-4 overflow-auto pb-6 h-full">
            {userAccounts.length > 0 ? (
              userAccounts.map((account) => (
                <AccountListItem
                  key={account.id}
                  account={account}
                  handleEdit={clickEdit}
                />
              ))
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
