const elements = document.querySelectorAll(".item-list li");
const search = document.querySelector("#item-search");
const form = document.querySelector("#item-search-form");
const count = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");
const donationForm = document.querySelector("#donation-form");
const donorName = document.querySelector("#donor-name");
const donationItem = document.querySelector("#donation-item");
const donationQty = document.querySelector("#donation-qty");
const donationMessage = document.querySelector("#donation-message");
const donationList = document.querySelector("#donation-list");

for (const item of elements) {
  const productName = item.querySelector("h3").textContent.trim();

  const option = document.createElement("option");
  option.textContent = productName;

  donationItem.appendChild(option);
}

function filterItems(searchText) {
  totalCount = elements.length;
  let itemCount = 0;
  for (const item of elements) {
    let productName = item.querySelector("h3").textContent;
    productName = productName.toLowerCase().trim();
    const searchQuery = searchText.toLowerCase().trim();

    if (productName.includes(searchQuery)) {
      item.classList.toggle("hidden", false);
      itemCount += 1;
    } else {
      item.classList.toggle("hidden", true);
    }
  }

  if (itemCount === 0) {
    noItems.classList.toggle("hidden", false);
  } else {
    noItems.classList.toggle("hidden", true);
  }
  count.textContent = `Showing ${itemCount} of ${totalCount} items`;
  console.log(
    `Showing ${itemCount} of ${totalCount} items for query "${searchText}"`,
  );
}

search.addEventListener("input", () => {
  filterItems(search.value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  filterItems(search.value);
});

donationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Retrieve and clean input
  const name = donorName.value.trim();
  const quantityText = donationQty.value.trim();

  // Validate name
  if (name === "") {
    donationMessage.textContent = "Please type your name.";
    return;
  }

  // Validate quantity is present
  if (quantityText === "") {
    donationMessage.textContent = "Please type a quantity.";
    return;
  }

  // Validate quantity
  const quantity = Number(quantityText);

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) {
    donationMessage.textContent =
      "Quantity must be a whole number from 1 to 500.";
    return;
  }

  // Create and append pledge
  donationMessage.textContent = "";

  const pledge = document.createElement("li");
  pledge.textContent = `${name}: ${quantity} x ${donationItem.value}`;

  donationList.appendChild(pledge);

  // Reset form
  donorName.value = "";
  donationQty.value = "";
  donorName.focus();
});

// Run once when the page loads
filterItems(search.value);
