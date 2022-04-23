import React, { useState } from "react";
import style from "./css/CreateUser.module.css";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import ButtonComponent from "../../components/ButtonComponent";
import { NavLink } from "react-router-dom";
import SelectBasic from "../../components/SelectBasic";

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const onSubmit = (data) => {};

  const ROLES = ["LIBRARIAN", "STUDENT"];
  return (
    <>
      <section className={style.banner}>
        <div className={style.form_create_user}>
          <label htmlFor="" className={style.lblTitle}>
            CREATE USER
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.containerInputs}>
              <Input
                label="first name"
                register={register("first_name", { required: true })}
              />
              <Input
                label="last name"
                register={register("last_name", { required: true })}
              />
            </div>
            <div className={style.containerInputs}>
              <Input
                label="email"
                register={register("email", { required: true })}
              />
              <InputPassword
                register={register("password", { required: true })}
              />
            </div>

            <div className={style.containerSelect}>
              <SelectBasic Labelname="Rol" ROLES={ROLES} />
            </div>
            <div className={style.contentButtonCreate}>
              <ButtonComponent label="Create User" type="submit" />
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

export default CreateUser;
