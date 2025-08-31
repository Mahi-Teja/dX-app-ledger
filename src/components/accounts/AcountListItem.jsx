import { useNavigate } from "react-router-dom";
import { AccountIcons, FreeIcons } from "../../utils/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteComp } from "./DeleteAccount";

export const AccountListItem = ({ account, handleEdit }) => {
  const { user } = useSelector((state) => state.user);
  const [openPopUp, setOpenPopUp] = useState(false);
  const navigate = useNavigate();

  return (
    <li className="grid border grid-cols-5 justify-between bg-[#fff] gap-3 px-3 rounded-lg shadow-md p-3 my-2 hover:shadow-lg transition-shadow duration-300">
      <div className="col-span-2 cursor-pointer flex items-center justify-start gap-3">
        <div className="p-1 text-3xl text-[#c45959]">
          {AccountIcons[account?.type] ?? "💼"}
        </div>
        <div>
          <div className="wrap-anywhere font-semibold text-xs md:text-lg lg:text-xl">
            {account?.name}
          </div>
          <div className="text-sm italic">{account?.type}</div>
        </div>
      </div>
      <div className="col-span-2 p-1 bg-[#c0ffc5] text-[#000000] flex justify-center items-center px-4 py-2 rounded-lg font-bold gap-1">
        <p className="text-2xl">{FreeIcons[user?.currency]}</p>
        <h3 className="text-sm md:text-lg">{account?.balance}</h3>
      </div>
      <div className="col-span-1 flex flex-co p-1 justify-self-end align-middle">
        <button
          className="p-1 m-0.5 rounded cursor-pointer"
          onClick={(e) => handleEdit(e, account)}
        >
          {FreeIcons.edit}
        </button>
        <button
          className="p-1 m-0.5 rounded cursor-pointer"
          onClick={() => setOpenPopUp(true)}
        >
          {FreeIcons.delete}
        </button>
        <button
          className="p-1 m-0.5 rounded cursor-pointer"
          onClick={() => navigate(`/accounts/${account.id}`)}
        >
          {FreeIcons.horixzontalThreeDots}
        </button>
      </div>

      {openPopUp && (
        <DeleteComp account={account} setOpenState={setOpenPopUp} />
      )}
    </li>
  );
};
