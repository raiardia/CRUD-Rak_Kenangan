const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    // Validasi input
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice ||
      !body.PublishDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
        Success: false,
      });
    }

    const bookAdd = await Book.insertOne(body);

    if (bookAdd){
        return res.status(201).json({
            message: "Book added successfully",
            Success: true, 
            Id: bookAdd?._id,
          });
    }

    console.log("bookAdd", bookAdd);
}catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      Success: false,
    }); 
  }
};

module.exports = { handleBookStoreController };
