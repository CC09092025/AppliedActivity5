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
(the donation part of script.js)
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
(git log --oneline)
```

**Explain (why trim() before checking the name, and why textContent and not innerHTML?):**

**Checkpoint 2 (expect 7):**

```text
(paste)
```

## Mission 3: Tick It Off and Count It

```text
(the tick box and tally part of script.js)
```

```text
(#total-pledged and #received-count after tests 1, 2, 3 and 4)
```

```text
(git log --oneline)
```

**Explain (why is the total a let while the element variables are const?):**

**Checkpoint 3 (expect 8):**

```text
(paste)
```

## Mission 4: Rescue the Sign-Up Page

**bug-report.md (paste the whole table):**

| #   | What I saw | Where I found it | Cause | Fix |
| --- | ---------- | ---------------- | ----- | --- |
| 1   |            |                  |       |     |
| 2   |            |                  |       |     |
| 3   |            |                  |       |     |
| 4   |            |                  |       |     |
| 5   |            |                  |       |     |
| 6   |            |                  |       |     |

```text
(one red Console message I saw)
```

**Breakpoint (one sentence: what did I see in the Scope panel, for example the values of filled and maxSpots, and what did it tell me?):**

```text
(#volunteer-count and #volunteer-list text after the final test)
```

```text
(git log --oneline)
```

**Explain (which bug gave no red message, and how did I find it?):**

**Checkpoint 4 (expect 15):**

```text
(paste)
```

## Mission 5: Publish and Release

```text
(validator result for index.html and volunteer.html)
```

```text
(git push -u origin feature/harvest-board)
```

```text
(git log --oneline --graph | head, then git log --oneline | wc -l : expect 16)
```

- Repository: https://github.com/...
- Issue #1 (closed): https://github.com/...
- Merged Pull Request: https://github.com/...
- Release v1.0.0: https://github.com/...

**Explain (what did Closes #1 do?):**

**Explain (git pull is a shortcut for which two commands?):**

## Mission 6: Reflection

1. **Events (my own analogy):**
2. **Validation:**
3. **Reading errors:**
4. **Pick the right tool:** (a) ... (b) ... (c) ... (d) ... (e) ...
5. **Beyond class:**

## Bonus (optional): Level Up

```text
(challenge, code and Console proof)
```
