import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../app/state/user";
import { addToLocalDB } from "../utils/addToLocalDB";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [data, setData] = useState(JSON.parse(localStorage.getItem("dxData")));

  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    setError(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleReEnter = (e) => {
  //     setError(false);
  //     if (e.target.value === formData.password) {
  //       setFormData({
  //         ...formData,
  //         [e.target.id]: e.target.value,
  //       });
  //       setDisabled(false);
  //       setError(false);
  //       setErrorMsg("");
  //     } else {
  //       setErrorMsg("passwords didnt match");
  //       setError(true);
  //       setDisabled(true);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData?.username && formData?.password) {
    try {
      // send api request Here..
      dispatch(addUser(formData));
      const updateUser = { user: formData };
      //   add data to localDb
      addToLocalDB({ user: formData });

      setError(false);
      navigate("/");
    } catch (error) {
      setError(true);
      setErrorMsg(error?.response?.data?.message);
      //   console.log(error);
    }
    // }
  };

  return (
    <div className="m-auto max-w-lg text-lg md:text-xl">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col p-3 mt-5"
      >
        <p className="font-bold text-4xl text-center m-3">Start your Journey</p>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="text"
          id="username"
          name="username"
          placeholder="username"
          className="p-3 bg-slate-600 rounded-lg my-3"
        />
        <input
          required
          onChange={(e) => handleChange(e)}
          type="email"
          id="email"
          name="email"
          placeholder="email"
          className="p-3 bg-slate-600 rounded-lg my-3"
        />
        {/* <input
          required
          onChange={(e) => handleChange(e)}
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 bg-slate-600 rounded-lg my-3"
        /> */}
        {/* <input
          required
          onChange={(e) => handleReEnter(e)}
          type="password"
          id="re-password"
          placeholder="re-enter password"
          className="p-3 bg-slate-600 rounded-lg my-3"
        /> */}
        {error ? (
          <div className=" p-4 rounded-md text-red-600 bg-orange-100">
            {errorMsg}
          </div>
        ) : null}
        <button
          disabled={disabled}
          className={`bg-green-900 p-3 rounded-lg my-3 disabled:opacity-60 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Lets Start
        </button>
      </form>
      {/* <div className="text-center">
        <p>
          Already have an account?
          <Link className="underline mx-1" to={"/login"}>
            {" "}
            Login
          </Link>
        </p>
      </div> */}
    </div>
  );
};

{
  /* <InputField
  handleChange={handleChange}
  type={"password"}
  id={"password"}
  lable={"Password"}
/>
<InputField
  handleChange={handleReEnter}
  type={"password"}
  id={"re-password"}
  lable={"Re-Enter Password"}
/> */
}
