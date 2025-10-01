document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  const errorBox = document.getElementById("error");
  const alertBox = document.getElementById("alertBox");
  const table = document.getElementById("productTable");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page reload

    let invalid = false;

    // Reset previous errors
    form.querySelectorAll("input[required]").forEach(input => {
      input.style.border = "";
      const span = input.nextElementSibling;
      if (span && span.classList.contains("error-text")) span.remove();
    });

    // Validate required fields
    form.querySelectorAll("input[required]").forEach(input => {
      if (!input.value.trim()) {
        invalid = true;
        input.style.border = "2px solid red";

        const span = document.createElement("span");
        span.className = "error-text";
        span.style.color = "red";
        span.innerText = "Invalid field";
        input.insertAdjacentElement("afterend", span);
      }
    });

    if (invalid) {
      errorBox.style.display = "block";
      return;
    } else {
      errorBox.style.display = "none";
    }

    try {
      const formData = new FormData(form);

      const res = await fetch("/products", {
        method: "POST",
        body: formData
      });

      const product = await res.json();

      if (product && product._id) {
        // Append new row to table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>#${product._id.toString().slice(-6)}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${Number(product.price).toLocaleString()}</td>
          <td>${product.quantity}</td>
        `;
        table.appendChild(newRow);

        // Show success message
        alertBox.style.display = "block";
        alertBox.textContent = "Product added successfully!";
        setTimeout(() => alertBox.style.display = "none", 3000);

        form.reset(); // Clear form
      }
    } catch (err) {
      console.error("Error adding product:", err);
      errorBox.style.display = "block";
      errorBox.textContent = "Error saving product.";
    }
  });
});
