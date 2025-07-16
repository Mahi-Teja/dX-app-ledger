import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { NavIcons } from "../utils/icons";
import useIsMobile from "../hooks/hooks.resize";
import { MENU_OPTIONS } from "../utils/constants";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { VscLayoutSidebarRight } from "react-icons/vsc";
const Nav = () => {
  const { user } = useSelector((state) => state.user);
  const isMobile = useIsMobile();
  return isMobile ? <MobileNav user={user} /> : <MainNav user={user} />;
};

const MainNav = ({ user }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleMenuExpansion = () => setIsMenuExpanded((prev) => !prev);

  return (
    <nav className="bg-indigo-200 text-indigo-900 p-6 lg:p-3 max-w-[24vw] shadow-md">
      <div className="px-3 mb-2 text-xl cursor-pointer transition-all">
        {isMenuExpanded ? (
          <VscLayoutSidebarRight onClick={toggleMenuExpansion} />
        ) : (
          <VscLayoutSidebarLeft onClick={toggleMenuExpansion} />
        )}
      </div>

      <ul role="navigation">
        <ExpandedNavItems
          user={user}
          isMenuExpanded={isMenuExpanded}
          setIsMenuExpanded={setIsMenuExpanded}
        />
      </ul>
    </nav>
  );
};

const ExpandedNavItems = ({ user, isMenuExpanded, setIsMenuExpanded }) => {
  return (
    <section className="flex flex-col max-w-[50vw] h-full">
      {MENU_OPTIONS.map(({ title, path }) => (
        <NavListItem
          key={path}
          path={path}
          label={title}
          isProfile={false}
          isMenuExpanded={isMenuExpanded}
          setIsMenuExpanded={setIsMenuExpanded}
        />
      ))}
      <NavListItem
        path="/profile"
        label="Profile"
        isProfile={true}
        user={user}
        isMenuExpanded={isMenuExpanded}
        setIsMenuExpanded={setIsMenuExpanded}
      >
        {/* Profile */}
      </NavListItem>
    </section>
  );
};

const ProfileNavItem = ({
  path,
  isActive,
  setIsMenuExpanded,
  extraClass,
  user,
  isMenuExpanded,
}) => (
  <Link to={path}>
    <li
      onClick={() => setIsMenuExpanded(false)}
      className={`cursor-pointer mx-auto hover:bg-indigo-100 text-xl 
        ${isActive ? "bg-indigo-100" : ""}
        text-indigo-900 font-medium rounded flex items-center transition-colors duration-300 ease-in-out
        ${extraClass}`}
    >
      {/* Avatar container - fixed size, no shrink */}
      <div className="p-2 py-3 flex-shrink-0">
        <img
          src={
            user?.avatar ||
            "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
          }
          alt="Profile Avatar"
          className="h-8 w-8 rounded-full object-cover border"
        />
      </div>

      {/* Expanding username label */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${
            isMenuExpanded
              ? "opacity-100 max-w-[200px]  ml-0"
              : "opacity-0 max-w-0 ml-2"
          }
          whitespace-nowrap`}
      >
        <span className="text-lg">{user?.username}</span>
      </div>
    </li>
  </Link>
);

const NavListItem = ({
  path,
  label,
  isProfile = false,
  user,
  children,
  isMenuExpanded,
  setIsMenuExpanded,
  extraClass = "",
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return !isProfile ? (
    path !== "/profile" && (
      <Link to={path}>
        <li
          onClick={() => setIsMenuExpanded(false)}
          className={`cursor-pointer hover:bg-indigo-100 text-xl w-full m-1
          ${isActive ? "bg-indigo-100" : ""}
          text-indigo-900 font-medium rounded flex items-center transition-colors duration-300 ease-in-out
          ${extraClass}`}
        >
          <div className="px-2 text-center text-xl py-3">
            {NavIcons[label] || NavIcons.Profile}
          </div>

          <div
            className={` text-lg pr-3  transition-all duration-300 ease-in-out
            ${
              isMenuExpanded
                ? "opacity-100 max-w-[200px]  ml-0"
                : "opacity-0 max-w-0 ml-2"
            }
            whitespace-nowrap`}
          >
            {children || label}
          </div>
        </li>
      </Link>
    )
  ) : (
    <ProfileNavItem
      path={path}
      user={user}
      isActive={isActive}
      isMenuExpanded={isMenuExpanded}
      setIsMenuExpanded={setIsMenuExpanded}
      extraClass={extraClass}
    />
  );
};

const MobileNav = memo(function MobileNav({ user }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md border-t border-white/30 shadow-lg z-50"
      role="navigation"
    >
      <ul className="flex justify-around items-center px-4 py-2">
        {MENU_OPTIONS.map(({ title, path }, i) => (
          <li key={i} className="flex flex-col items-center text-2xl">
            <Link
              to={path}
              className={`rounded-full p-2 transition-colors duration-200 
                ${
                  isActive(path)
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
