import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const { user } = useSelector((state) => state.user);

  return <DesktopNav user={user} />;
};

const DesktopNav = ({ user }) => {
  return (
    <nav>
      <ul className="flex justify-around  bg-[#3e3e3e] p-4">
        <li className="self-start">
          <Link to="/profile">
            <ul className="flex justify-center items-center  ">
              <li className="">
                <img
                  className="h-[32px] w-8 object-contain"
                  src={user?.avatar}
                  alt="profile_avatar"
                />
              </li>
              <li className="px-2 self-center">{user?.username}</li>
            </ul>
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/accounts">accounts</Link>
        </li>
        <li>
          <Link to="/category">category</Link>
        </li>
        <li>
          <Link to="/budgets">budgets</Link>
        </li>
        <li>
          <Link to="/transactions">Transacions</Link>
        </li>
      </ul>
    </nav>
  );
};

const MobileNav = () => {
  return <></>;
};

export default Nav;
