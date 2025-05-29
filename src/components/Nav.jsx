import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { NavIcons } from "../utils/icons";
import useIsMobile from "../hooks/hooks.resize";

const Nav = () => {
  const { user } = useSelector((state) => state.user);
  const isMobile = useIsMobile();
  return isMobile ? <MobileNav user={user} /> : <ResizeNav user={user} />;
};

const ResizeNav = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openMenu]);

  const toggleMenu = () => setOpenMenu((prev) => !prev);

  const NavListItem = ({ children, path, classList = "" }) => (
    <Link to={path}>
      <li
        onClick={() => setOpenMenu(false)}
        className={`cursor-pointer lg:hover:bg-indigo-100 
          ${openMenu ? "text-3xl  p-5 block mx-auto" : "text-sm p-0"}
           text-indigo-900 font-medium px-3   rounded hover:bg-pink-200 lg:bg-transparent transition-colors  ${classList}`}
      >
        {children}
      </li>
    </Link>
  );

  return (
    <nav className="bg-indigo-200 text-indigo-900 p-6 lg:p-3 relative shadow-md">
      <div className="absolute z-50 text-3xl font-bold right-3 top-2 lg:hidden cursor-pointer">
        {openMenu ? (
          <RxCross2 onClick={toggleMenu} />
        ) : (
          <RxHamburgerMenu onClick={toggleMenu} />
        )}
      </div>

      {openMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <ul
        className={`${
          openMenu
            ? " fixed top-10 left-0 right-0 w-full h-screen z-50 flex-col items-center justify-center space-y-6 bg-pastel-blue text-xl"
            : "hidden lg:flex lg:flex-row lg:static lg:justify-around lg:bg-transparent lg:p-0 lg:space-y-0"
        } bg-indigo-100`}
        role="navigation"
      >
        <section
          className={`${
            openMenu
              ? "flex  flex-col w-full h-full"
              : "hidden lg:flex lg:flex-row lg:static lg:justify-around lg:items-center lg:bg-transparent lg:p-0 lg:space-y-0 lg:w-full"
          }`}
        >
          <NavListItem path="/">Home</NavListItem>
          <NavListItem path="/accounts">Accounts</NavListItem>
          <NavListItem path="/category">Category</NavListItem>
          <NavListItem path="/budgets">Budgets</NavListItem>
          <NavListItem path="/transactions">Transactions</NavListItem>
          <NavListItem path="/profile" classList="lg:ml-auto">
            <div className="flex items-center gap-2">
              <img
                src={
                  user?.avatar ||
                  "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                }
                alt="Profile Avatar"
                className="h-8 w-8 rounded-full object-cover border"
              />
              <span>{user?.username}</span>
            </div>
          </NavListItem>
        </section>
      </ul>
    </nav>
  );
};

const MobileNav = memo(function MobileNav({ user }) {
  const menuOptions = [
    { title: "Home", path: "/" },
    { title: "Accounts", path: "/accounts" },
    { title: "Categories", path: "/category" },
    { title: "Budgets", path: "/budgets" },
    { title: "Transactions", path: "/transactions" },
    { title: "Profile", path: "/profile" },
  ];

  const [active, setActive] = useState("Home");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md border-t border-white/30 shadow-lg z-50"
      role="navigation"
    >
      <ul className="flex justify-around items-center px-4 py-2">
        {menuOptions.map(({ title, path }, i) => (
          <li key={i} className="flex flex-col items-center text-2xl">
            <Link
              to={path}
              onClick={() => setActive(title)}
              className={`rounded-full p-2 transition-colors duration-200 ${
                active === title
                  ? "bg-indigo-400 text-white"
                  : "bg-indigo-100 text-indigo-800"
              }`}
              aria-label={title}
            >
              {title === "Profile" && user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="h-8 w-8 object-cover rounded-full"
                />
              ) : (
                NavIcons[title] || title
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Nav;
