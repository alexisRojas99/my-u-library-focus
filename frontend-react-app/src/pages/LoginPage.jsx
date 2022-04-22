import React, { useContext, useState } from "react";
import style from "./css/LoginPage.module.css";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import AuthContext from "../contexts/AuthContext";
import Auth from "../services/auth/index";
import ButtonComponent from "../components/ButtonComponent";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { setUser, setLoading } = useContext(AuthContext);

  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    const regex =
      /^([a-zA-Z0-9./^S+$/<*>!#$%&'+/=?^_`{|}~-]+([s]{0}))+?@[a-zA-Z]+([.]{1})[a-zA-Z]+[s]{0}[.]?[a-zA-Z](([.]{0,1})([a-zA-Z]{2})+)*$/;

    if (!regex.test(data.email)) {
      return setError("email invalid");
    }

    const login = await Auth.login(data.email, data.password);
    if (
      login.message === "user not found" ||
      login.message === "wrong password"
    ) {
      setError("wrong username and/or password");
      return;
    }
    const userData = await Auth.auth();
    setUser(userData);
    window.location.replace("/");
  };
  return (
    <>
      <section className={style.banner}>
        <div className={style.form_login}>
          <label htmlFor="" className={style.lblTitle}>
            LOG IN
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.containerInputs}>
              <Input
                label="email"
                register={register("email", { required: true })}
              />
              <InputPassword
                register={register("password", { required: true })}
              />
            </div>
            <p className={style.link_password}>
              <NavLink to="/">You forgot your password?</NavLink>
            </p>
            <div className={style.contentLogIn}>
              <ButtonComponent label="Log In" type="submit" />
            </div>
            <center>
              <span>{error && error}</span>
            </center>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
