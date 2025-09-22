import React from "react";
import { useState } from "react";
import { bookBaseUrl } from "../axiosInstance";


const Home = () => {

  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    try{
      const data = await bookBaseUrl.post("/addbook", bookForm);
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }

  console.log("bookForm", bookForm);


  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Name</label>
          <input type="text" placeholder="Book Name" className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2" 
          name="BookName"
          value={bookForm.BookName}
          onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Title</label>
          <input type="text" placeholder="Book Title" className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2" 
          name="BookTitle"
          value={bookForm.BookTitle}
          onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Author</label>
          <input type="text" placeholder="Author" className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2" 
          name="Author"
          value={bookForm.Author}
          onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Selling Price</label>
          <input type="text" placeholder="Selling Price" className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2" 
          name="SellingPrice"
          value={bookForm.SellingPrice}
          onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Publish Date</label>
          <input type="date" placeholder="Publish Date" className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-1 outline-none h-8 px-2" 
          name="PublishDate"
          value={bookForm.PublishDate}
          onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
      <button className="bg-blue-500 text-white rounded-sm px-4 py-2 cursor-pointer" onClick={handleSubmit}>Submit</button>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">

          <table className="w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Name</th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publish Date</th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className ="bg-white divide-y divide-gray-200">
              <tr className ="hover:bg-gray-200">
                <td className ="px-6 py-3 whitespace-nowrap">Book Name</td>
                <td className ="px-6 py-3 whitespace-nowrap">Book Title</td>
                <td className ="px-6 py-3 whitespace-nowrap">Author</td>
                <td className ="px-6 py-3 whitespace-nowrap">Selling Price</td>
                <td className ="px-6 py-3 whitespace-nowrap">Publish Date</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

export default Home;
