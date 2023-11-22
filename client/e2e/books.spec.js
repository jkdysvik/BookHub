import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/project2/");
});

test("should navigate to the homepage and find an element", async ({
  page,
}) => {
  // Use the `expect` function to make assertions
  await expect(page.locator("#genreSelect")).toBeVisible();
  await expect(page.locator("#orderBySelect")).toBeVisible();
});

test("should update data when genre is set to Fantasy", async ({ page }) => {
  // Select a genre from the dropdown
  await page.selectOption("#genreSelect", "Fantasy");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  expect(firstBookTitle).toBe("Maze of Existence");
});

test("should update data when genre is set to Historical fiction", async ({
  page,
}) => {
  // Select a genre from the dropdown
  await page.selectOption("#genreSelect", "Historical fiction");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  expect(firstBookTitle).toBe("CIRCUS RIDER");
});

test("should update data when order is changed to year", async ({ page }) => {
  // Select order from the dropdown
  await page.selectOption("#orderBySelect", "Year");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  expect(firstBookTitle).toBe("Atom Heart John Belo...");
});

test("should update data when order is changed to author", async ({ page }) => {
  // Select order from the dropdown
  await page.selectOption("#orderBySelect", "author");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  expect(firstBookTitle).toBe("The 50th Law");
});

// test both change of genre and order
test("should update data when genre and order is changed", async ({ page }) => {
  await page.selectOption("#genreSelect", "Science fiction");
  await page.selectOption("#orderBySelect", "title");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  expect(firstBookTitle).toBe('"Repent, Harlequin!"...');
});

test("should update data when search is performed for title", async ({
  page,
}) => {
  // Enter a search query in the search input field
  const searchQuery = "Harry Potter";
  await page.fill(".search-input", searchQuery);

  // Trigger the search action
  await page.click(".navbar-button");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  // Verify that the displayed result matches the expected outcome
  expect(firstBookTitle).toContain(searchQuery);
});

test("should update data when search is performed for author", async ({
  page,
}) => {
  // Enter a search query in the search input field
  const searchQuery = "Jo Nesbø";
  await page.fill(".search-input", searchQuery);

  // Trigger the search action
  await page.click(".navbar-button");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  // Verify that the displayed result matches the expected outcome
  expect(firstBookTitle).toBe("Police");
});

// Test that search, sort and order work together
test("should update data when searching, sorting and ordering", async ({
  page,
}) => {
  // Enter a search query in the search input field
  const searchQuery = "John";
  await page.fill(".search-input", searchQuery);

  // Trigger the search action
  await page.click(".navbar-button");

  await page.selectOption("#genreSelect", "Fiction");
  await page.selectOption("#orderBySelect", "title");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  // Verify that the displayed result matches the expected outcome
  expect(firstBookTitle).toBe("1919");
});

test("should navigate to book details page when a book card is clicked", async ({
  page,
}) => {
  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  // Get the initial URL before clicking
  const initialUrl = page.url();

  // Clicking on the book card
  await bookCard.click();

  // Get the URL after clicking
  const newUrl = page.url();
  // Verify that the URL has changed, indicating navigation to the book details page
  expect(newUrl).not.toBe(initialUrl);

  const bookTitle = await page.textContent(".bookPage-title");
  expect(bookTitle).toBe("CIRCUS RIDER");
});

test("should update data when search returns no data", async ({ page }) => {
  // Enter a search query in the search input field
  const searchQuery =
    "Insanely weird search query that will not return any results";
  await page.fill(".search-input", searchQuery);

  // Trigger the search action
  await page.click(".navbar-button");

  const bookCardLocator = page.locator(".book-card-container .book-card");
  expect(await bookCardLocator.count()).toBe(0);
});

test("should update data when filtering returns no data", async ({ page }) => {
  // Enter a search query in the search input field
  const searchQuery = "Jo nesbø";
  await page.fill(".search-input", searchQuery);

  // Trigger the search action
  await page.click(".navbar-button");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  // Checks that there is a book after search
  expect(firstBookTitle).toBe("Police");

  await page.selectOption("#genreSelect", "Fiction");

  const bookCardLocator2 = page.locator(".book-card-container .book-card");

  // Checks that there is no book after filtering
  expect(await bookCardLocator2.count()).toBe(0);
});

test("should update data when doing a sequence of actions", async ({
  page,
}) => {
  // Enter a search query in the search input field
  const searchQuery = "harry";
  await page.fill(".search-input", searchQuery);

  // Trigger the search action
  await page.click(".navbar-button");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  // Checks that there is a book after search
  expect(firstBookTitle).toBe("Harry Potter Boxed S...");

  // Check after filtering
  await page.selectOption("#genreSelect", "Historical fiction");

  const bookCard2 = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv2 = await bookCard2.waitForSelector(".title-div");
  const firstBookTitle2 = await titleDiv2.textContent(".book-card.title");

  expect(firstBookTitle2).toBe("This Thing of Darkne...");

  // Check after ordering
  await page.selectOption("#orderBySelect", "Author");

  const bookCard3 = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv3 = await bookCard3.waitForSelector(".title-div");
  const firstBookTitle3 = await titleDiv3.textContent(".book-card.title");

  expect(firstBookTitle3).toBe("Bridie and Finn");
});
