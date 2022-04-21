import instance from "../config/axiosConfig";

class Books {
  /**
   *
   * @param {string} author - reference book
   * @param {string} title - reference book
   * @param {string} genre - reference book
   * @param {integer} page - pagination book
   * @param {integer} pageSize - pagination book
   * @returns
   */
  static async getBooks(
    page,
    pageSize,
    author = null,
    title = null,
    genre = null
  ) {
    const params = {};

    if (author) {
      params.author = author;
    }

    if (title) {
      params.title = title;
    }

    if (genre) {
      params.genre = genre;
    }

    if (page) {
      params.page = page;
    }

    if (pageSize) {
      params.pageSize = pageSize;
    }
    const response = await instance.get("/api/books/available", {
      params,
    });
    return response;
  }

  /**
   *
   * @param {string} isbn - book id
   * @param {string} title - reference book
   * @param {string} author - reference book
   * @param {integer} published_year -reference book
   * @param {string} genre - reference book
   * @param {integer} stock - reference book
   * @returns
   */
  static async createBook(isbn, title, author, published_year, genre, stock) {
    const data = {
      isbn,
      title,
      author,
      published_year,
      genre,
      stock,
    };

    const response = await instance.post("/api/books", data);

    return response;
  }

  /**
   *
   * @param {string} isbn - book id
   * @param {string} author - reference book
   * @param {integer} published_year - reference book
   * @param {string} genre - reference book
   * @param {integer} stock - reference book
   * @returns
   */

  static async updateBook(isbn, author, published_year, genre, stock) {
    const data = {
      author,
      published_year,
      genre,
      stock,
    };

    const response = await instance.put(`/api/book/${isbn}`, data);

    return response;
  }

  /**
   *
   * @param {string} isbn - book id
   * @returns
   */

  static async deleteBook(isbn) {
    const response = await instance.delete(`/api/books/${isbn}`);

    return response;
  }
}

export default Books;
