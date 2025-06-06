Book Review API (Node.js + Express + MongoDB)

A RESTful API for a simple Book Review system built with Node.js, Express.js, and MongoDB. This backend supports JWT-based authentication and provides secure access to manage books and their reviews.


Features

1 User Signup & Login (JWT Auth)
2 Add/View Books (with Pagination & Filters)
3 Submit One Review Per Book (Authenticated users only)
4 Update/Delete Reviews (only by owner)
5 Search Books by Title/Author (case-insensitive, partial match)

Tech Stack

1 Backend: Node.js, Express.js
2 Database: MongoDB (with Mongoose)
3 Authentication: JWT (JSON Web Tokens)
4 Tools: Postman, Atlas, Compass, VS Code

Project Structure

   Book-Review-API
├── controllers/
│ ├── authControllers/
│ ├── bookControllers/
│ └── reviewController/
├── middleware/
│ └── authMiddleware.js
├── models/
├── config/
│ └── db.js
├── utils/
│ └── jwtUtils.js
├── app.js
├── server.js
├── .env
└── README.md

API Endpoints

Authentication

| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| POST   | `/signup`    | Register a new user    |
| POST   | `/login`     | Login and get JWT token|

Books

| Method | Endpoint        | Description                                   |
|--------|------------------|-----------------------------------------------|
| POST   | `/books`         | Add a book (Authenticated only)               |
| GET    | `/books`         | Get all books (pagination + filters supported)|
| GET    | `/books/:id`     | Get book details with average rating & reviews|


Setup Instructions

1. Clone the Repository
git clone https://github.com/your-username/Book-Review-API.git
cd Book-Review-API

2. Install Dependencies
npm install

3. Create .env File
PORT=5000
HOST=0.0.0.0
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

5. Start the Server
node server.js

6. Authentication
All protected routes require a token in the Authorization header:
Authorization: Bearer <your_token>

Example API requests

1. POST /signup – register a new user
url : http://localhost:5000/signup
request body : {
    "name":"Shivam",
    "email":"shivam12231@gmail.com",
    "password":"123456789"
}
reponse : {
    "message": "User created successfully"
}

2. POST /login – authenticate and return a token
url : http://localhost:5000/login
request body : {
    "email":"shivam12231@gmail.com",
    "password":"123456789"
}
response : {
    "message": "Signin successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDMzNWYzMDliMDlhZjJiZWE1ZGMyNyIsImlhdCI6MTc0OTIzNTM5MywiZXhwIjoxNzQ5MzIxNzkzfQ.oA7c7hKNihDKuvyZhBBajhhsfZE8AzOm96hTzsTD8Uk"
}

3. POST /books – Add a new book (Authenticated users only)
url: http://localhost:5000/books
Bearear Token : Access Token (value from login api)
Request Body :  {
                  "title": "The Art OF letting go",
                  "author": "Perl",
                  "genre": "Classic Fiction" 
                }
Response : {
              "title": "The Art OF letting go",
              "author": "Perl",
              "genre": "Classic Fiction",
              "averageRating": 0,
              "totalReviews": 0,
              "_id": "6843398409b09af2bea5dc2c",
              "createdAt": "2025-06-06T18:55:00.313Z",
              "updatedAt": "2025-06-06T18:55:00.313Z",
              "__v": 0
            }


5. GET /books – Get all books (with pagination and optional filters by author and genre)
url: http://localhost:5000/books
Bearear Token : Access Token (value from login api)
Response : "{
    "success": true,
    "total": 3,
    "page": 1,
    "pages": 1,
    "books": [
        {
            "_id": "6843398409b09af2bea5dc2c",
            "title": "The Art OF letting go",
            "author": "Perl",
            "genre": "Classic Fiction",
            "averageRating": 0,
            "totalReviews": 0,
            "createdAt": "2025-06-06T18:55:00.313Z",
            "updatedAt": "2025-06-06T18:55:00.313Z",
            "__v": 0
        },
        {
            "_id": "68432d90a564c5fbfe3ebd33",
            "title": "Harry Potter",
            "author": "J. K. Rowlings",
            "genre": "Classic Fiction",
            "averageRating": 0,
            "totalReviews": 0,
            "createdAt": "2025-06-06T18:04:00.792Z",
            "updatedAt": "2025-06-06T18:04:00.792Z",
            "__v": 0
        },
        {
            "_id": "68431b6694ea5456962624ed",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Classic Fiction",
            "publicationDate": "1925-04-10T00:00:00.000Z",
            "averageRating": 0,
            "totalReviews": 0,
            "createdAt": "2025-06-06T16:46:30.960Z",
            "updatedAt": "2025-06-06T16:46:30.960Z",
            "__v": 0
        }
    ]
}"



7. GET /books/:id – Get book details by ID, including: Average rating and Reviews (with pagination)
url: http://localhost:5000/books/:id
Bearear Token : Access Token (value from login api)
Response : {
    "success": true,
    "book": {
        "_id": "68431b6694ea5456962624ed",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic Fiction",
        "publicationDate": "1925-04-10T00:00:00.000Z",
        "averageRating": 0,
        "totalReviews": 0,
        "createdAt": "2025-06-06T16:46:30.960Z",
        "updatedAt": "2025-06-06T16:46:30.960Z",
        "__v": 0
    },
    "averageRating": 4,
    "totalReviews": 1,
    "currentPage": 1,
    "totalPages": 1,
    "reviews": [
        {
            "_id": "68432ef6a564c5fbfe3ebd3c",
            "user": {
                "_id": "68432bee530f42d26e282e28",
                "name": "Pankaj"
            },
            "book": "68431b6694ea5456962624ed",
            "rating": 4,
            "comment": "A fascinating read with timeless themes.",
            "createdAt": "2025-06-06T18:09:58.599Z",
            "updatedAt": "2025-06-06T18:09:58.599Z",
            "__v": 0
        }
    ]
}


8. POST /books/:id/reviews – Submit a review (Authenticated users only, one review per user per book)
url: http://localhost:5000/books/:id/reviews
Bearear Token : Access Token (value from login api)
Request Body : {
  "rating": 4,
  "comment": "A fascinating read with timeless themes."
}

Response : {
    "message": "Review submitted successfully",
    "review": {
        "user": "68432bee530f42d26e282e28",
        "book": "68431b6694ea5456962624ed",
        "rating": 4,
        "comment": "A fascinating read with timeless themes.",
        "_id": "68433b2209b09af2bea5dc3c",
        "createdAt": "2025-06-06T19:01:54.257Z",
        "updatedAt": "2025-06-06T19:01:54.257Z",
        "__v": 0
    }
}

9. PUT /reviews/:id – Update your own review
url: http://localhost:5000/reviews/:id
Bearear Token : Access Token (value from login api)
Request Body : {
                  "rating": 3,
                  "comment": "A fascinating read with timeless themes."
                }
Response:      {
                  "_id": "68433b2209b09af2bea5dc3c",
                  "user": "68432bee530f42d26e282e28",
                  "book": "68431b6694ea5456962624ed",
                  "rating": 3,
                  "comment": "A fascinating read with timeless themes.",
                  "createdAt": "2025-06-06T19:01:54.257Z",
                  "updatedAt": "2025-06-06T19:04:21.053Z",
                  "__v": 0
              }

10. DELETE /reviews/:id – Delete your own review
url: http://localhost:5000/reviews/:id
Bearear Token : Access Token (value from login api)
Response:  {
              "message": "Review deleted successfully"
           }

   
Additional Feature:
9. GET /search – Search books by title or author (partial and case-insensitive)
example url: http://localhost:5000/search?query=F. Scott Fitzgerald
Bearear Token : Access Token (value from login api)
Response :   {
                "success": true,
                "results": [
                    {
                        "_id": "68431b6694ea5456962624ed",
                        "title": "The Great Gatsby",
                        "author": "F. Scott Fitzgerald",
                        "genre": "Classic Fiction",
                        "publicationDate": "1925-04-10T00:00:00.000Z",
                        "averageRating": 0,
                        "totalReviews": 0,
                        "createdAt": "2025-06-06T16:46:30.960Z",
                        "updatedAt": "2025-06-06T16:46:30.960Z",
                        "__v": 0
                    }
                ],
                "total": 1
            }


Design Decisions / Assumptions

1. JWT token expiration set to 1 day
2. One review allowed per user per book
3. Only review owner can update/delete their review
4. Case-insensitive and partial search on books

Schema of models:

1. User Model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


2. Book model

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    genre: {
      type: String
    },
    publicationDate: {
      type: Date
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);


3. Review Model

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Ensure one review per user per book
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);

Author
Paras Yadav
