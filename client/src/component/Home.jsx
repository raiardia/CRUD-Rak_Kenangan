import React, { useEffect } from "react";
import { useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    Id: "",
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");
      setBookList(data?.BookList);
    } catch (error) {
      console.log("Error fetching book list:", error);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        if (
          !bookForm.BookName ||
          !bookForm.BookTitle ||
          !bookForm.Author ||
          !bookForm.SellingPrice ||
          !bookForm.PublishDate
        ) {
          alert("All fields are required");
          return;
        }
        const { data } = await bookBaseUrl.post("/addbook", bookForm);
        if (data?.Success) {
          alert("✅ Data berhasil disimpan!");
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          });
          getAllbookList();
        }
      } else {
        const { data } = await bookBaseUrl.put("/updatebook", bookForm);
        if (data?.Success) {
          alert("✅ Data berhasil diupdate!");
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          });
          setIsUpdating(false);
          getAllbookList();
        }
      }
    } catch (error) {
      console.log(error);
      alert("❌ Gagal menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.delete("/deletebook", {
        data: { Id: id },
      });
      if (data?.Success) {
        alert(data?.Message);
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
      alert("❌ Gagal menghapus data.");
    }
  };
  // Helper di luar atau atas komponen
  const isoToDate = (isoStr) => isoStr.split("T")[0];

  const handleUpdate = (data) => {
    setBookForm({
      _id: data._id,
      BookName: data.BookName,
      BookTitle: data.BookTitle,
      Author: data.Author,
      SellingPrice: data.SellingPrice,
      PublishDate: isoToDate(data.PublishDate), // format jadi yyyy-mm-dd
    });
    setIsUpdating(true);
  };

  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder="Selling Price"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder="Publish Date"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-blue-500 text-white rounded-sm px-4 py-2 cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookList?.map((book, index) => {
                return (
                  <tr className="hover:bg-gray-200" key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookTitle}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.Author}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.SellingPrice}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.PublishDate?.split("T")[0] || ""}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="w-20 flex justify-center gap-5">
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg cursor-pointer"
                          onClick={() => handleUpdate(book)}
                        >
                          <span>
                            <TbEdit />
                          </span>
                        </div>
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg cursor-pointer"
                          onClick={() => handleDelete(book._id)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
