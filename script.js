const elements = document.querySelectorAll(".item-list li");
const search = document.querySelector("#item-search");
const form = document.querySelector("#item-search-form");
const count = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");

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

// Run once when the page loads
filterItems(search.value);
