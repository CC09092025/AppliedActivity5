# Applied Activity 5: Harvest Board (Individual)

**Name:** Carter Atkins
**GitHub username:** CC09092025
**Repository URL:** https://github.com/CC09092025/AppliedActivity5/

> This report is my own individual work. I built my own repository, my own code and my own report.

---

## Mission 0: Set Up and Open the Case

```text
~/Projects/AppliedActivity-5 main
❯ git config --global -l
user.name=Carter Atkins
user.email=a00323762@mycambrian.ca
credential.https://github.com.helper=
credential.https://github.com.helper=!/usr/bin/gh auth git-credential
credential.https://gist.github.com.helper=
credential.https://gist.github.com.helper=!/usr/bin/gh auth git-credential
core.editor=zed --wait
init.defaultbranch=main
credential.helper=store
```

```text
~/Projects/AppliedActivity-5 main 11s
❯ git remote -v
origin  https://github.com/CC09092025/AppliedActivity5.git (fetch)
origin  https://github.com/CC09092025/AppliedActivity5.git (push)
```

```text
~/Projects/AppliedActivity-5 main
❯ git log --oneline
8e37baa (HEAD -> main, origin/main) Add README for Harvest Board
b33616d Added initial files
```

- Issue #1: https://github.com/CC09092025/AppliedActivity5/issues/1

## Mission 1: The Live Item Finder

```text
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
  console.log(`Showing ${itemCount} of ${totalCount} items`);
  console.log(
    `Showing ${itemCount} of ${totalCount} items for query "${searchText}"`,
  );
}
```

```text
Showing 7 of 7 items for query ""
Showing 1 of 7 items for query "rice"
Showing 3 of 7 items for query "CANNED"
Showing 0 of 7 items for query "zzz"
Showing 7 of 7 items for query "   "
Showing 1 of 7 items for query "Canned vegetables"
```

My item is Canned Vegetables, therefore the 3 of 7 is correct, not 2 of 7.

```text
~/Projects/AppliedActivity-5 feat/harvest-board
❯ git log --oneline
9487705 (HEAD -> feat/harvest-board) Implement interactive item search and filtering
ce60aab Added Canned Vegetables and script.js module to index page
eb89092 (main) Updated Report Template
8e37baa (origin/main) Add README for Harvest Board
b33616d Added initial files
```

**Explain (why does an empty search box show every item?):** An empty search query is considered a match for every string because every string contains an empty substring.

**Checkpoint 1 (git log --oneline | wc -l, expect 5):**

```text
~/Projects/AppliedActivity-5 feat/harvest-board
❯ git log --oneline | wc -l
5
```

## Mission 2: The Pledge Form

```text
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
```

```text
document.querySelector("#donation-item").options.length
7
```

✅ "Quantity must be a whole number from 1 to 500." appears when inputting "abc" or "501" as the quantity.

```text
document.querySelector("#donation-list").textContent.trim()
"Carter: 200 x Canned beans"
```

```text
~/Projects/AppliedActivity-5 feat/harvest-board
❯ git log --oneline
5a4f009 (HEAD -> feat/harvest-board) Added donation validation and submission
865f8a6 Populate the item dropdown
9487705 Implement interactive item search and filtering
ce60aab Added Canned Vegetables and script.js module to index page
eb89092 (main) Updated Report Template
8e37baa (origin/main) Add README for Harvest Board
b33616d Added initial files
```

**Explain (why trim() before checking the name, and why textContent and not innerHTML?):** `.trim()` removes leading and trailing whitespace so empty or space-only inputs are rejected, while `textContent` displays user input as plain text rather than interpreting it as HTML, helping prevent XSS attacks.

**Checkpoint 2 (expect 7):**

```text
~/Projects/AppliedActivity-5 feat/harvest-board 40s
❯ git log --oneline | wc -l
7
```

## Mission 3: Tick It Off and Count It

```text
const totalPledgedElement = document.querySelector("#total-pledged");
const receivedCountElement = document.querySelector("#received-count");

let totalPledged = 0;

function updateTallies() {
  const pledges = donationList.querySelectorAll("li");
  const receivedCount = donationList.querySelectorAll("li.done").length;

  totalPledgedElement.textContent = `Total pledged: ${totalPledged} items`;
  receivedCountElement.textContent = `Received: ${receivedCount} of ${pledges.length} pledges`;
}

...

const pledge = document.createElement("li");

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

...

totalPledged += quantity;
updateTallies();

// Run once when the page loads
filterItems(search.value);
updateTallies();
```

```text
On Page (Re)Load
document.querySelector("#total-pledged").textContent
"Total pledged: 0 items"
document.querySelector("#received-count").textContent
"Received: 0 of 0 pledges"

After 2 Pledges
document.querySelector("#total-pledged").textContent
"Total pledged: 20 items"
document.querySelector("#received-count").textContent
"Received: 0 of 2 pledges"

Ticking First Pledge
document.querySelector("#total-pledged").textContent
"Total pledged: 20 items"
document.querySelector("#received-count").textContent
"Received: 1 of 2 pledges"

Unticking First Pledge
document.querySelector("#total-pledged").textContent
"Total pledged: 20 items"
document.querySelector("#received-count").textContent
"Received: 0 of 2 pledges"

After 3 Pledges and Ticking Third Pledge
document.querySelector("#total-pledged").textContent
"Total pledged: 50 items"
document.querySelector("#received-count").textContent
"Received: 1 of 3 pledges"
```

```text
~/Projects/AppliedActivity-5 feat/harvest-board*
❯ git log --oneline
aa1a342 (HEAD -> feat/harvest-board) Added checkbox for pledges
5a4f009 Added donation validation and submission
865f8a6 Populate the item dropdown
9487705 Implement interactive item search and filtering
ce60aab Added Canned Vegetables and script.js module to index page
eb89092 (main) Updated Report Template
8e37baa (origin/main) Add README for Harvest Board
b33616d Added initial files
```

**Explain (why is the total a let while the element variables are const?):** `totalPledged` uses `let` because its value changes whenever a new pledge is added, while the element variables use `const` because their references to the HTML elements never change.

**Checkpoint 3 (expect 8):**

```text
~/Projects/AppliedActivity-5 feat/harvest-board*
❯ git log --oneline | wc -l
8
```

## Mission 4: Rescue the Sign-Up Page

**bug-report.md (paste the whole table):**

| #   | What I saw                                                             | Where I found it                                           | Cause                                                                            | Fix                                                                                             |
| --- | ---------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1   | JavaScript couldn't find the HTML elements (`null`).                   | `volunteer.html`, `<head>`                                 | The script executes before the HTML elements are loaded.                         | Added `defer` to `<script>`.                                                                    |
| 2   | User input could be interpreted as HTML.                               | `addVolunteer()`, `item.innerHTML`                         | `innerHTML` parses user input as HTML, creating an XSS risk.                     | Replaced `innerHTML` with `textContent` and created a separate `<strong>` element for the name. |
| 3   | Empty names are not being rejected correctly.                          | `volunteer.js`, name validation inside the submit listener | Used `=` (assignment) instead of `===` (strict equality comparison).             | Changed `=` to `===` to correctly check whether the name is empty.                              |
| 4   | A sixth volunteer could register even when all five spots were filled. | `volunteer.js`, capacity validation                        | Used `>` instead of `>=`, allowing registration when `filled` equals `maxSpots`. | Changed `>` to `>=` to reject sign-ups when all spots are filled.                               |
| 5   | Counter could not be incremented.                                      | `volunteer.js`, `filled` declaration                       | `const` prevents reassignment.                                                   | Changed `const filled = 0` to `let filled = 0`.                                                 |
| 6   | Form submission reloads the page.                                      | `volunteer.js`, submit event listener                      | Default form submission behaviour was not prevented.                             | Added `event.preventDefault()`.                                                                 |     |

```text
Uncaught TypeError: can't access property "addEventListener", volunteerForm is null
    <anonymous> http://127.0.0.1:8000/volunteer.js:20
 volunteer.js:20:1
    <anonymous> http://127.0.0.1:8000/volunteer.js:20

```

**Breakpoint (one sentence: what did I see in the Scope panel, for example the values of filled and maxSpots, and what did it tell me?):** the Scope panel showed `filled` as `0` and `maxSpots` as `5`, but `filled` could not be reassigned because it was declared with `const`, indicating why the counter could not increment.

```text
First Volunteer: 1 of 5 spots filled Carter (Sorter)
Empty Name: Please type your name first.
<b>Ana</b>: Shows as plain text, 2 of 5 spots filled
Five Volunteers: 5 of 5 spots filled Carter (Sorter)<b>Ana</b> (Sorter)John (Sorter)Jane (Sorter)James (Sorter)
Sixth Volunteers Attempt: All spots are filled. Thank you!
```

```text
~/Projects/AppliedActivity-5 feat/harvest-board*
❯ git log --oneline
e018b5b (HEAD -> feat/harvest-board) Resovled issues with volunteer
aa1a342 Added checkbox for pledges
5a4f009 Added donation validation and submission
865f8a6 Populate the item dropdown
9487705 Implement interactive item search and filtering
ce60aab Added Canned Vegetables and script.js module to index page
eb89092 (main) Updated Report Template
8e37baa (origin/main) Add README for Harvest Board
b33616d Added initial files
```

**Explain (which bug gave no red message, and how did I find it?):** The missing `event.preventDefault()` caused the page to reload instead of displaying the validation message; I found it by comparing the volunteer form's submit listener with my working donation form.

**Checkpoint 4 (expect 15):**

```text
~/Projects/AppliedActivity-5 feat/harvest-board*
❯ git log --oneline | wc -l
9
```

## Mission 5: Publish and Release

```text
index.html: Document checking completed. No errors or warnings to show.
volunteer.html: Document checking completed. No errors or warnings to show.
```

```text
(git push -u origin feature/harvest-board)
```

```text
~/Projects/AppliedActivity-5 main ⇡ 10s
❯ git log --oneline --graph --all
  git status
*   8754bec (HEAD -> main) Merge branch 'main' of https://github.com/CC09092025/AppliedActivity5
|\
| *   3cb4d5b (tag: v1.0.0, origin/main, origin/HEAD) Merge pull request #2 from CC09092025/feat/harvest-board
| |\
* | | 62267a5 (feat/harvest-board) Update report template
| |/
|/|
* | 865ed79 (origin/feat/harvest-board) Updated ReportTemplate
* | e018b5b Resovled issues with volunteer
* | aa1a342 Added checkbox for pledges
* | 5a4f009 Added donation validation and submission
* | 865f8a6 Populate the item dropdown
* | 9487705 Implement interactive item search and filtering
* | ce60aab Added Canned Vegetables and script.js module to index page
* | eb89092 Updated Report Template
|/
* 8e37baa Add README for Harvest Board
* b33616d Added initial files
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

~/Projects/AppliedActivity-5 feat/harvest-board*
❯ git log --oneline | wc -l
13
```

- Repository: https://github.com/CC09092025/AppliedActivity5/
- Issue #1 (closed): https://github.com/CC09092025/AppliedActivity5/issues/1
- Merged Pull Request: https://github.com/CC09092025/AppliedActivity5/pull/2
- Release v1.0.0: https://github.com/CC09092025/AppliedActivity5/releases/tag/v1.0.0

**Explain (what did Closes #1 do?):** automatically closes GitHub Issue #1 when the pull request is merged into the default branch.

**Explain (git pull is a shortcut for which two commands?):** `git pull` is a shortcut for `git fetch` followed by `git merge`. It downloads the latest remote changes and merges them into the current local branch.

## Mission 6: Reflection

1\. **Events:** An event listener is like a doorbell that waits for someone to press it before doing something. I used `input`, `submit`, and `change` events to wait for typing, form submission, and checkbox changes.

2\. **Validation:** `=== ""` allows three spaces because spaces are not an empty string. A form should also reject negative quantities. Browser validation alone is insufficient because someone could bypass the page and send invalid data directly to the server.

3\. **Reading errors:** `Cannot read properties of null` means JavaScript tried to use an element that wasn't found. I encountered this when a script ran before the HTML loaded and when a selector didn't match an existing element.

4\. **Pick the right tool:** (a) Console and inspect the submit listener for missing `preventDefault()`. (b) Console, check the values used in the calculation. (c) Debugger with a breakpoint. (d) Debugger to step through the code. (e) W3C HTML Validator.

5\. **Beyond class:** I would use a live filter in my PhishBERT project to search and filter phishing email samples. The least clear concept to me is event propagation.

## Bonus (optional): Level Up

Search Including Categories

```
"Grains": Showing 2 of 7 items (Rice and Pasta)
"Pantry": Showing 3 of 7 items (Canned beans, Canned tomatoes, Canned vegetables)
```

Clearing Received Pledges
Before:

```text
Total pledged: 25 items
Received: 2 of 3 pledges
```

After

```text
Total pledged: 8 items
Received: 0 of 1 pledges
```

Disabled Sign Up
<5 sign ups: "Claim my spot" is active
=5 sign ups: "Claim my spot" is disabled, preventing further signups without having to check count when button is pressed
