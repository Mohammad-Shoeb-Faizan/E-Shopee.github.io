const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector("nav ul");

hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburgerMenu.classList.toggle("open");
});
document.addEventListener("DOMContentLoaded", getProducts);

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    const productsContainer = document.getElementById("products-container");

    products.forEach((product) => {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function createProductCard(product) {
  const { id, title, price, image } = product;

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const productImage = document.createElement("img");
  productImage.src = image;
  productCard.appendChild(productImage);

  const productName = document.createElement("h6");
  productName.textContent = title;
  productCard.appendChild(productName);

  const productPrice = document.createElement("p");
  productPrice.textContent = `Price: $${price}`;
  productCard.appendChild(productPrice);

  productCard.addEventListener("click", () => {
    window.location.href = `product.html?id=${id}`;
  });

  return productCard;
}
