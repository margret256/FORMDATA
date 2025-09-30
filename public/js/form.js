document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const tableBody = document.querySelector("tbody");
  const inStockCard = document.querySelector(".stat-card.green h2");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity(); // Shows browser's built-in validation messages
      return;
    }

    // Get form values
    const name = form.querySelector('input[placeholder="Product Name"]').value.trim();
    const category = form.querySelector('input[placeholder="Category"]').value.trim();
    const price = form.querySelector('input[placeholder="Price"]').value.trim();
    const quantity = form.querySelector('input[placeholder="Quantity"]').value.trim();
    const fileInput = form.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    // Generate a random ID
    const id = "#" + Math.floor(Math.random() * 1000000);

    // Handle image
    let imgHTML = "No Image";
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgHTML = `<img src="${e.target.result}" alt="${name}" style="width:50px;height:50px;">`;
        addRow(id, name, category, price, quantity, imgHTML);
      };
      reader.readAsDataURL(file);
    } else {
      addRow(id, name, category, price, quantity, imgHTML);
    }

    form.reset();
  });

  function addRow(id, name, category, price, quantity, imgHTML) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${Number(price).toLocaleString()}</td>
      <td>${quantity}</td>
      <td>${imgHTML}</td>
    `;
    tableBody.appendChild(newRow);

   // Update In stock total
let currentStock = inStockCard.textContent.replace(/[^0-9]/g, "");
currentStock = parseInt(currentStock, 10) || 0;

// Convert input values
const priceValue = Number(price);      // product price
const quantityValue = Number(quantity); // product quantity

// Calculate new stock value
const addedStockValue = priceValue * quantityValue;

// Add to existing stock
const newStock = currentStock + addedStockValue;

// Update card
inStockCard.textContent = newStock.toLocaleString();

  }
});
