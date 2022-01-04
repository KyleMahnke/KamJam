// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");
const { products } = require("./productData");

async function rebuildDB() {
  try {
    await client.query(/*sql*/ `
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
      DROP TYPE IF EXISTS condition_enum;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS users;
    `);

    await client.query(/*sql*/ `
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE categories(
        id  SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        imageurl TEXT
      );

      CREATE TYPE condition_enum as ENUM('New', 'Used');

      CREATE TABLE products(
        id  SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        imageurl TEXT,
        "categoryName" VARCHAR(255) REFERENCES categories(name),
        condition condition_enum,
        inventory INTEGER,
        price DECIMAL(10,2)
      );

      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL
      );
    `);
    // drop tables in correct order
    // build tables in correct order
  } catch (error) {
    console.error(error);
  }
}

async function seedData() {
  try {
    const users = [
      {
        email: "kamjamtest@gmail.com",
        password: "kamjampassword000",
        name: "KamJam Test",
      },
      {
        email: "kyletest@gmail.com",
        password: "kyletestpassword123",
        name: "Kyle Test",
      },
      {
        email: "austintest@gmail.com",
        password: "austintestpassword456",
        name: "Austin Test",
      },
      {
        email: "marktest@gmail.com",
        password: "marktestpassword789",
        name: "Mark Test",
      },
    ];

    for (const user of users) {
      await client.query(
        /*sql*/ `
      INSERT INTO users
      (email, password, name)
      VALUES ($1, $2, $3);
    `,
        [user.email, user.password, user.name]
      );
    }

    const categories = [
      {
        name: "Guitars",
        imageurl:
          "https://static.sonovente.com/img/library/zoom/56/optim/56153_1.jpg",
      },
      {
        name: "Drums",
        imageurl:
          "https://media.sweetwater.com/api/i/q-82__ha-1f60e355579b2bf7__hmac-d80888d53b2a61ae45066af962fceb423dcbf45d/images/items/750/EVO22BKSi-large.jpg",
      },
      {
        name: "Band",
        imageurl:
          "https://cdn.shopify.com/s/files/1/0577/8492/6388/products/TC236GL_0168-min.jpg?v=1624549836",
      },
      {
        name: "Keyboards",
        imageurl:
          "https://m.media-amazon.com/images/I/71HQQWhlK9L._AC_SL1500_.jpg",
      },
      {
        name: "Accessories",
        imageurl:
          "https://media.guitarcenter.com/is/image/MMGS7/213017000000000-00-2000x2000.jpg",
      },
    ];

    for (const category of categories) {
      await client.query(
        /*sql*/ `
      INSERT INTO categories
      (name, imageurl)
      VALUES ($1, $2);
    `,
        [category.name, category.imageurl]
      );
    }

    // list of products - moved to db/productData.js

    for (const product of products) {
      await client.query(
        /*sql*/ `
      INSERT INTO products
      (name, description, imageurl, "categoryName", condition, inventory, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
        [
          product.name,
          product.description,
          product.imageurl,
          product.categoryName,
          product.condition,
          product.inventory,
          product.price,
        ]
      );
    }

    const carts = [
      { userId: 1, productId: 1, quantity: 2 },
      { userId: 2, productId: 4, quantity: 1 },
      { userId: 3, productId: 5, quantity: 1 },
      { userId: 4, productId: 2, quantity: 1 },
      { userId: 4, productId: 1, quantity: 1 },
      { userId: 4, productId: 4, quantity: 1 },
      { userId: 4, productId: 6, quantity: 3 },
    ];

    for (const cart of carts) {
      await client.query(
        /*sql*/ `
      INSERT INTO cart
      ("userId", "productId", quantity)
      VALUES ($1, $2, $3);
    `,
        [cart.userId, cart.productId, cart.quantity]
      );
    }
    // create useful starting data
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  rebuildDB,
  seedData,
};
