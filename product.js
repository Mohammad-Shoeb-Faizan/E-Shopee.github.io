document.addEventListener("DOMContentLoaded", getProductDetails);

async function getProductDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
      console.error("Product ID not found in URL");
      return;
    }

    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = await response.json();

    displayProductDetails(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function displayProductDetails(product) {
  const productImage = document.querySelector(".product-image img");
  productImage.src = product.image;

  const productTitle = document.querySelector(".product-title");
  productTitle.textContent = product.title;

  const productPrice = document.querySelector(".product-price");
  productPrice.textContent = `Price: $${product.price}`;

  const productDescription = document.querySelector(".product-description");
  productDescription.textContent = product.description;

  const addToCartButton = document.querySelector(".add-to-cart");
  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });
}

function addToCart(product) {
  // Getting all the existing cart items from local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Checking if the product is already in the cart
  const existingProduct = cartItems.find((item) => item.id === product.id);
  if (existingProduct) {
    // Incrementing the quantity if the product is already in the cart
    existingProduct.quantity++;
  } else {
    // Adding the product to the cart with a quantity of 1
    product.quantity = 1;
    cartItems.push(product);
  }

  // Updating the cart items in local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  window.location.href = "orders.html";
}
