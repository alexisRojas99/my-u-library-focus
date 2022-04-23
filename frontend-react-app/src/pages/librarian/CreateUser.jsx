import React, { useState } from "react";
import style from "./css/CreateUser.module.css";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import ButtonComponent from "../../components/ButtonComponent";
import SelectBasic from "../../components/SelectBasic";
import Users from "../../services/users/index";

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [clean, setClean] = useState({});

  const onSubmit = async (data) => {    
    const regex =
      /^([a-zA-Z0-9./^S+$/<*>!#$%&'+/=?^_`{|}~-]+([s]{0}))+?@[a-zA-Z]+([.]{1})[a-zA-Z]+[s]{0}[.]?[a-zA-Z](([.]{0,1})([a-zA-Z]{2})+)*$/;

    if (!isNaN(data.first_name) || !isNaN(data.last_name)) {
      return setError("the first name and last name cannot be numbers");
    }

    if (!regex.test(data.email)) {
      return setError("email invalid");
    }

    const createUser = await Users.createUser(
      data.first_name,
      data.last_name,
      data.email,
      data.role,
      data.password
    );

    if (createUser.data.message === "email must be unique") {
      return setError("the user is already registered");
    }

    setMessage("user created successfully");
    clean.first_name.target.value = null;
    clean.last_name.target.value = null;
    clean.email.target.value = null;
    clean.password.target.value = null;
  };

  const cleaningMessages = () => {
    setError(false); 
    setMessage(false);
  }

  const ROLES = ["LIBRARIAN", "STUDENT"];
  return (
    <>
      <section className={style.banner}>
        <div className={style.form_create_user}>
          <label htmlFor="" className={style.lblTitle}>
            CREATE NEW USER
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.containerInputs}>
              <Input
                label="first name"
                register={register("first_name", { required: true })}
                onChange={(e) => {setClean({...clean, first_name: e}); cleaningMessages()}}
              />
              <Input
                label="last name"
                register={register("last_name", { required: true })}
                onChange={(e) => {setClean({...clean, last_name: e}); cleaningMessages()}}
              />
            </div>
            <div className={style.containerInputs}>
              <Input
                label="email"
                register={register("email", { required: true })}
                onChange={(e) => {setClean({...clean, email: e}); cleaningMessages()}}
              />
              <InputPassword
                register={register("password", { required: true })}
                onChange={(e) => {setClean({...clean, password: e}); cleaningMessages()}}
              />
            </div>

            <div className={style.containerSelect}>
              <SelectBasic
                Labelname="Rol"
                ROLES={ROLES}
                register={register("role", { required: true })}
              />
            </div>
            <div className={style.contentButtonCreate}>
              <ButtonComponent label="Create User" type="submit" />
            </div>
            <center>
              <span>{error && error}</span>
              <span>{message && message}</span>
            </center>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateUser;
