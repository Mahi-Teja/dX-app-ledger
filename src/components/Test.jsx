import React from "react";
import { Link } from "react-router-dom";

const Test = () => {
  const navitems = [
    { title: "Home", icon: "", to: "/home" },
    { title: "Profile", icon: "", to: "/profile" },
    {
      title: "transactions",
      icon: "",
      to: "/transactions",
      sub: [
        { title: "Home", icon: "", to: "/home" },
        { title: "Profile", icon: "", to: "/profile" },
      ],
    },
  ];
  const NavBar = () => {
    return (
      <nav className="flex absolute   flex-col shadow-md w-80 h-screen text-center md:flex md:w-screen md:h-auto md:flex-row bg-amber-200">
        {navitems.map((item, index) => {
          return (
            <ul key={index} className="mx-3">
              <li className="hover:bg-amber-600 w-full p-3 m-1">
                <Link to={item.to}>{item.title}</Link>
              </li>
            </ul>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="relative">
      <NavBar></NavBar>
      <div className=" bg-gray-700 w-screen">
        <h1>1234 JKHjkhjkhkhkhjk</h1>
        <h1>JKHjkhjkhkhkhjk</h1>
        <h1>JKHjkhjkhkhkhjk</h1>
        <h1>JKHjkhjkhkhkhjk</h1>
        <h1>JKHjkhjkhkhkhjk</h1>
        <h1>JKHjkhjkhkhkhjk</h1>
      </div>
    </div>
  );
};

export default Test;
