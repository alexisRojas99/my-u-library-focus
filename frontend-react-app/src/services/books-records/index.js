import instance from "../config/axiosConfig";

class BooksRecords {
  static async getAllBooksRecords() {
    const response = await instance.get("/api/books-records");

    // console.log(response);

    return response;
  }

  /**
   *
   * @param {integer} id_user
   * @param {string} isbn
   * @param {integer} quantity
   * @param {string} movement_type
   * @returns
   */
  static async createBooksRecords(id_user, isbn, quantity, movement_type) {
    const data = {
      id_user,
      isbn,
      quantity,
      movement_type,
    };
    const response = await instance.post("/api/books-records", data);

    return response;
  }
}

export default BooksRecords;
