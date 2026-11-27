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
const totalPledgedElement = document.querySelector("#total-pledged");
const receivedCountElement = document.querySelector("#received-count");
const clearReceivedButton = document.querySelector("#clear-received");

let totalPledged = 0;

for (const item of elements) {
  const productName = item.querySelector("h3").textContent.trim();

  const option = document.createElement("option");
  option.textContent = productName;

  donationItem.appendChild(option);
}

function filterItems(searchText) {
  const totalCount = elements.length;
  let itemCount = 0;

  const searchQuery = searchText.toLowerCase().trim();

  for (const item of elements) {
    let productName = item.querySelector("h3").textContent;
    productName = productName.toLowerCase().trim();
    let category = item.querySelector(".category").textContent;
    category = category.toLowerCase().trim();

    if (productName.includes(searchQuery) || category.includes(searchQuery)) {
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

function updateTallies() {
  const pledges = donationList.querySelectorAll("li");
  const receivedCount = donationList.querySelectorAll("li.done").length;

  totalPledgedElement.textContent = `Total pledged: ${totalPledged} items`;
  receivedCountElement.textContent = `Received: ${receivedCount} of ${pledges.length} pledges`;
}

function clearReceivedPledges() {
  const received = donationList.querySelectorAll("li.done");

  for (const pledge of received) {
    totalPledged -= Number(pledge.dataset.quantity);
    pledge.remove();
  }

  updateTallies();
}

clearReceivedButton.addEventListener("click", clearReceivedPledges);

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
  pledge.dataset.quantity = quantity;

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = `${name}: ${quantity} x ${donationItem.value}`;

  label.appendChild(checkbox);
  label.appendChild(span);

  pledge.appendChild(label);
  donationList.appendChild(pledge);

  // Handle received status
  checkbox.addEventListener("change", () => {
    pledge.classList.toggle("done", checkbox.checked);
    updateTallies();
  });

  // Update total
  totalPledged += quantity;
  updateTallies();

  // Reset form
  donorName.value = "";
  donationQty.value = "";
  donorName.focus();
});

// Run once when the page loads
filterItems(search.value);
updateTallies();
