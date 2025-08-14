const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// *============HELPERS==============* \\
const formatUSD = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

const withFormattedPrice = (item) => ({
  ...item,
  priceFormatted: formatUSD(item.price),
});

const RESTAURANT = {
  name: "The Green Byte Bistro",
  isOpen: false,
  address: "742 Evergreen Rd, Mapleview, OS 45502",
  phone: "555-321-9876",
  menu: [
    {
      id: 1,
      name: "Quantum Quinoa Mushroom Burger",
      price: 13.0,
      rating: 4,
      category: "mains",
      details:
        "A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.",
    },
    {
      id: 2,
      name: "Binary Berry Cheesecake",
      price: 10.11,
      rating: 3,
      category: "desserts",
      details:
        "A creamy cheesecake bursting with flavor. A mix of berries in every byte.",
    },
    {
      id: 3,
      name: "Recursive Rigatoni",
      price: 17.0,
      rating: 5,
      category: "mains",
      details:
        "A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You'll keep coming back for more.",
    },
    {
      id: 4,
      name: "Pumpkin Pi Squared",
      price: 3.14,
      rating: 5,
      category: "desserts",
      details:
        "A delightful pumpkin dessert, squared and spiced to perfection.",
    },
    {
      id: 5,
      name: "Fibonacci String Bean Fries",
      price: 11.23,
      rating: 5,
      category: "sides",
      details:
        "Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.",
    },
  ],
};
// ================= HOME ROUTE =============== \\
app.get("/", (req, res) => {
  res.render("home", {
    restaurant: RESTAURANT,
  });
});

// ============== MENU LIST ROUTE (preformatted) =============== \\
app.get("/menu", (req, res) => {
  const menuItems = RESTAURANT.menu.map(withFormattedPrice);
  res.render("menu", {
    restaurant: RESTAURANT,
    menuItems,
  });
});
// =============== CATEGORY ROUTE (/menu/:category) =============== \\
app.get("/menu/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  // filter first-then add formatted price
  const menuItems = RESTAURANT.menu
    .filter((item) => item.category === category)
    .map(withFormattedPrice);

  res.render("category", {
    restaurant: RESTAURANT,
    category,
    menuItems, // category/menuItems are already defined above; here they are just passing to the view
  });
});
// ================ 404 ERROR HANDLER ================== \\
app.use((req, res) => {
  res.status(404).send("Not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
