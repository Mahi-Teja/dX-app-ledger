import React, { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

const Nav = () => {
  const { user } = useSelector((state) => state.user);

  return <ResizeNav user={user} />;
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

const ResizeNav = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMenu]);

  const switchMenu = () => {
    setOpenMenu((pre) => !pre);
  };

  const NavListItem = ({ children, path, classList }) => {
    return (
      <Link to={path}>
        <li
          onClick={() => setOpenMenu(false)}
          className={` bg-slate-700 font-semibold px-2 m-1 hover:bg-slate-600  lg:p-1 lg:px-3 lg:bg-transparent  lg:self-center lg:m-0 lg:mx-1 lg:hover:bg-slate-600  cursor-pointer ${classList}`}
        >
          {children}
        </li>
      </Link>
    );
  };
  return (
    <nav className={` bg-slate-800 p-4 relative    `}>
      <div className="absolute z-50 right-3 top-2 lg:hidden">
        {openMenu ? (
          <RxCross2 onClick={() => switchMenu()} />
        ) : (
          <RxHamburgerMenu onClick={() => switchMenu()} />
        )}
      </div>
      {/* {openMenu ? ( */}
      {openMenu && (
        <div className="fixed top-8 left-0 right-0 bottom-0 lg:hidden  z-10 bg-[#000000af]"></div>
      )}
      <ul
        // flex lg:flex-row flex-col justify-around px-4
        className={` ${openMenu ? "flex shadow-2xl scroll-none  " : "hidden"}
         bg-slate-800 fixed  top-8 left-0 right-0 bottom-0 w-[75%] z-50 flex-col justify-start  overflow-hidden lg:flex lg:flex-row lg:static lg:justify-around lg:w-full  `}
      >
        <NavListItem path={"/"}>Home</NavListItem>

        <NavListItem path={"/accounts"}>Accounts</NavListItem>

        <NavListItem path={"/category"}>Category</NavListItem>

        <NavListItem path={"/budgets"}>Budgets</NavListItem>

        <NavListItem path={"/transactions"}>Transacions</NavListItem>
        <NavListItem path={"/profile"} classList={"lg:self-end "}>
          <ul className="flex items-center   ">
            <li className="rounded-full p-1 overflow- bg-green-400">
              <img
                className="h-[32px] w-8 object-contain"
                src={
                  user?.avatar ||
                  "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                }
                alt="profile_avatar"
              />
            </li>
            <li className="px-2 self-center">{user?.username}</li>
          </ul>
        </NavListItem>
      </ul>
      {/* // ) : ( */}

      {/* // )} */}
    </nav>
  );
};

export default Nav;
