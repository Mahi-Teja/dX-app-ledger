import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const log = () => {
    const data = {
      user: {
        id: "u001",
        avatar:
          "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png",
        name: "Munna",
        email: "munna@example.com",
        currency: "INR",
      },
      transactions: [],
      accounts: [],
      categories: [],
      expense: [],
      budgets: [],
    };
    localStorage.setItem("data", JSON.stringify(data));
    // naviagte to Home
    navigate("/");
  };
  return (
    <div>
      <input type="text" />
      <button onClick={(e) => log(e)}>Login</button>
    </div>
  );
};
