import React, { useState } from "react";
import style from "./css/CreateBook.module.css";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import ButtonComponent from "../../components/ButtonComponent";

const CreateBook = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const onSubmit = (data) => {};

  return (
    <>
      <section className={style.banner}>
        <div className={style.form_add_new_book}>
          <label htmlFor="" className={style.lblTitle}>
            ADD NEW BOOK
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.containerInputs}>
              <Input
                label="isbn"
                register={register("isbn", { required: true })}
              />
              <Input
                label="title"
                register={register("title", { required: true })}
              />
            </div>
            <div className={style.containerInputs}>
              <Input
                label="author"
                register={register("author", { required: true })}
              />
              <Input
                label="published year"
                register={register("published_year", { required: true })}
              />
            </div>
            <div className={style.containerInputs}>
              <Input
                label="genre"
                register={register("genre", { required: true })}
              />
              <Input
                label="stock"
                register={register("stock", { required: true })}
              />
            </div>
            <div className={style.contentButtonCreate}>
              <ButtonComponent label="Add book " type="submit" />
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

export default CreateBook;
