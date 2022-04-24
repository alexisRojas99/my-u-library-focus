import React, { useState } from "react";
import style from "./css/CreateBook.module.css";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import ButtonComponent from "../../components/ButtonComponent";
import Books from '../../services/books'

const CreateBook = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [clean, setClean] = useState({});
  const onSubmit = async (data) => {

    if (!isNaN(data.title) || !isNaN(data.author) || !isNaN(data.genre)) {
      return setError("cannot be numbers");
    }

    const createBook = await Books.createBook(data.isbn, data.title, data.author, Number(data.published_year), data.genre, Number(data.stock));
    
    if (createBook.data.message === "isbn must be unique") {
      return setMessage("the isbn already exists")
    }

    if (createBook?.status === 400) {
      return setMessage(createBook.data[0]?.message)
    }

    setMessage("book added successfully");
    clean.isbn.target.value = null;
    clean.title.target.value = null;
    clean.author.target.value = null;
    clean.published_year.target.value = null;
    clean.genre.target.value = null;
    clean.stock.target.value = null;
  };

  const cleaningMessages = () => {
    setError(false); 
    setMessage(false);
  }

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
                onChange={(e) => {setClean({...clean, isbn: e}); cleaningMessages()}}
              />
              <Input
                label="title"
                register={register("title", { required: true })}
                onChange={(e) => {setClean({...clean, title: e}); cleaningMessages()}}
              />
            </div>
            <div className={style.containerInputs}>
              <Input
                label="author"
                register={register("author", { required: true })}
                onChange={(e) => {setClean({...clean, author: e}); cleaningMessages()}}
              />
              <Input
                label="published year"
                register={register("published_year", { required: true })}
                onChange={(e) => {setClean({...clean, published_year: e}); cleaningMessages()}}
                type="number"
              />
            </div>
            <div className={style.containerInputs}>
              <Input
                label="genre"
                register={register("genre", { required: true })}
                onChange={(e) => {setClean({...clean, genre: e}); cleaningMessages()}}
              />
              <Input
                label="stock"
                type="number"
                register={register("stock", { required: true })}
                onChange={(e) => {setClean({...clean, stock: e}); cleaningMessages()}}
              />
            </div>
            <div className={style.contentButtonCreate}>
              <ButtonComponent label="Add book " type="submit" />
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

export default CreateBook;
