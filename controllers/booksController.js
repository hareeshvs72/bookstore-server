const books = require('../models/bookModal')
const stripe = require("stripe")("sk_test_51SPbdnFP9sjWd71Vyu2FKMoUayw6Feq1K1nKf8xw7pifNwdJxTwyMrHKe63Kjksg2CHOU4Nmg3uB0sOdVePVLkfk000OzIZ9bv")

exports.addBookController = async (req, res) => {
  console.log("inside add Book Controller");

  console.log(req.body);
  console.log(req.files);
  const { title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category } = req.body
  const userMail = req.payload
  var uploadImg = []
  req.files.map(item => uploadImg.push(item.filename))
  console.log(title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail);

  try {
    const existingBook = await books.findOne({ title, userMail })
    if (existingBook) {
      res.status(401).json("you have already added the book")
    }
    else {
      const newBook = new books({
        title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail
      })
      await newBook.save()
      res.status(200).json(newBook)
    }

  } catch (error) {
    res.status(500).json(error)
  }


}
// get home books

exports.getHomeBooks = async (req, res) => {
  console.log("insided get home book");

  try {
    const allHomeBooks = await books.find().sort({ _id: -1 }).limit(4)
    res.status(200).json(allHomeBooks)
  } catch (error) {
    res.status(500).json(error)

  }

}

// get all books

exports.getAllBooks = async (req, res) => {
  console.log("insided get home book");
  const email = req.payload
  const searchKey = req.query.search
  const query = {
    userMail: { $ne: email },
    title: { $regex: searchKey, $options: 'i' }
  }
  try {
    const allbooks = await books.find(query)
    res.status(200).json(allbooks)
  } catch (error) {
    res.status(500).json(error)

  }

}

// view book

exports.viewBookController = async (req, res) => {
  console.log("inside viewBook Controller");
  const { id } = req.params
  console.log(id);

  try {
    const ViewBook = await books.findById({ _id: id })
    res.status(200).json(ViewBook)
  } catch (error) {
    res.status(500).json(error)
  }


}

// user upload books

exports.userBooksUpload = async (req, res) => {
  console.log("userBooksUpload");
  const email = req.payload
  try {
    const allUserbooks = await books.find({ userMail: email })
    res.status(200).json(allUserbooks)
  } catch (error) {
    res.status(500).json(error)

  }

}

// get all user Bought Books
exports.getAllUserBoughtBooks = async (req, res) => {
  console.log("inside getAllUserBoughtBooks");
  const email = req.payload
  try {
    const allUserBoughtbooks = await books.find({ bought: email })
    res.status(200).json(allUserBoughtbooks)
  } catch (error) {
    res.status(500).json(error)

  }

}

// remove user upload books

exports.deleteUserBook = async (req, res) => {
  console.log("inside deleteUserBook");
  // get book id
  const { id } = req.params
  console.log(id);
  try {
    await books.findByIdAndDelete({ _id: id })
    res.status(200).json("Dekete SucessFully")
  } catch (error) {
    res.status(500).json(error)
  }


}

exports.getAllBookAdminController = async (req, res) => {
  console.log("inside getAllBookAdminController");
  try {
    const allAdminBooks = await books.find()
    res.status(200).json(allAdminBooks)
  } catch (error) {
    res.status(500).json(error)
  }

}

// updaet staus to approve  of books by admin 

exports.updateBookStatusController = async (req, res) => {

  console.log("inside updateBookStatusController ");

  const { _id, title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail, bought } = req.body
  try {
    const updateBook = await books.findByIdAndUpdate({ _id }, { title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, status: "approve", userMail, bought }, { new: true })
    await updateBook.save()
    res.status(200).json(updateBook)
  } catch (error) {
    res.status(500).json(error)
  }

}

// make payment 

exports.makeBookPayemnetController = async (req, res) => {
  console.log("inside make book controller");
console.log(req.body);
  const { _id, title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail } = req.body
  const email = req.payload
  
  
  try {
    const updateBookDetails = await books.findByIdAndUpdate({ _id }, { title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, status: "sold", userMail, bought: email }, { new: true })
    console.log(updateBookDetails);

    //  stripe check out section

    const line_items = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: title,
          description: `${author} | ${publisher}`,
          images: uploadImg,
          metadata: {
            title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, status: "sold", userMail, bought: email
          }
        },
        unit_amount: Math.round(discountPrice * 100)
      },
      quantity: 1
    }]

    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/payment-success',
      cancel_url: 'http://localhost:5173/payment-error'
    });
    console.log(session);
    res.status(200).json({checkOutSessionURL:session.url})

  } catch (error) {
    res.status(500).json(error)
  }

}