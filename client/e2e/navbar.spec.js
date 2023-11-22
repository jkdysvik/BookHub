import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/project2/");
});

test("should navigate to the homepage when pressing the logo", async ({
  page,
}) => {
  // Navigate to a book page
  await page.goto(
    "http://localhost:5173/project2/book/65535349180c5749fb9f3ecd",
  );
  await expect(page.locator("#genreSelect")).toBeHidden();

  // Click on the logo
  const logo = page.locator(".logo");
  await logo.click();

  // Verify that the homepage is displayed
  await expect(page.locator("#genreSelect")).toBeVisible();
});

test("should clear search input when remove button is clicked", async ({
  page,
}) => {
  const clearButton = page.locator("#remove-button");
  const searchInput = page.locator(".search-input");

  const searchQuery = "Harry Potter";
  await page.fill(".search-input", searchQuery);

  // Make the search
  await page.click(".navbar-button");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  // Check that search is successful
  expect(firstBookTitle).toContain(searchQuery);

  // Click on the clear button
  await clearButton.click();

  // Check that the search input is cleared
  const inputValue = await searchInput.evaluate((input) => input.value);
  expect(inputValue).toBe("");

  const bookCard2 = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv2 = await bookCard2.waitForSelector(".title-div");
  const firstBookTitle2 = await titleDiv2.textContent(".book-card.title");

  // Check that the books are not the search results
  expect(firstBookTitle2).not.toEqual(firstBookTitle);
});

test("should not trigger search when clicking on the Search icon without a query", async ({
  page,
}) => {
  const searchIcon = page.locator('.navbar-button:has-text("Search")');
  const searchInput = page.locator(".search-input");

  const bookCard = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv = await bookCard.waitForSelector(".title-div");
  const firstBookTitle = await titleDiv.textContent(".book-card.title");

  await searchIcon.click();

  // Check that the search input is empty
  const inputValue = await searchInput.evaluate((input) => input.value);
  expect(inputValue).toBe("");

  const bookCard2 = await page.waitForSelector(
    ".book-card-container .book-card:first-child",
  );
  const titleDiv2 = await bookCard2.waitForSelector(".title-div");
  const firstBookTitle2 = await titleDiv2.textContent(".book-card.title");

  // Check that the books are not changed
  expect(firstBookTitle2).toEqual(firstBookTitle);
});
