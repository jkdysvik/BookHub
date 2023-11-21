import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/project2/');
});

test('should navigate to the homepage and find an element', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173/project2/');
  
    // Use the `expect` function to make assertions
    await expect(page.locator('#genreSelect')).toBeVisible();
  });

  test('should update data when genre is set to Fantasy', async ({ page }) => {
    // Select a genre from the dropdown
    await page.selectOption('#genreSelect', 'Fantasy');
  
    // Wait for the data to update
    await page.waitForTimeout(1); 
  
    const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
    const titleDiv = await bookCard.waitForSelector('.title-div');
    const firstBookTitle = await titleDiv.textContent('.book-card.title');
  
    expect(firstBookTitle).toBe('Maze of Existence');
  });

  test('should update data when genre is set to Historical fiction', async ({ page }) => {
    // Select a genre from the dropdown
    await page.selectOption('#genreSelect', 'Historical fiction');
  
    // Wait for the data to update
    await page.waitForTimeout(1); 
  
    const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
    const titleDiv = await bookCard.waitForSelector('.title-div');
    const firstBookTitle = await titleDiv.textContent('.book-card.title');
  
    expect(firstBookTitle).toBe('CIRCUS RIDER');
  });

  test('should update data when order is changed to year', async ({ page }) => {
    // Select order from the dropdown
    await page.selectOption('#orderBySelect', 'Year');
    
    // Wait for the data to update
    await page.waitForTimeout(1);
  
    const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
    const titleDiv = await bookCard.waitForSelector('.title-div');
    const firstBookTitle = await titleDiv.textContent('.book-card.title');
   
    expect(firstBookTitle).toBe('Atom Heart John Belo...');
  });

  test('should update data when order is changed to author', async ({ page }) => {
    
    await page.selectOption('#orderBySelect', 'author');
    
    // Wait for the data to update
    await page.waitForTimeout(1);
  
    const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
    const titleDiv = await bookCard.waitForSelector('.title-div');
    const firstBookTitle = await titleDiv.textContent('.book-card.title');
   
    expect(firstBookTitle).toBe('The 50th Law');
  });

  // test both change of genre and order
  test('should update data when genre and order is changed', async ({ page }) => {
    
    await page.selectOption('#genreSelect', 'Science fiction');
    await page.selectOption('#orderBySelect', 'title');
    
    // Wait for the data to update
    await page.waitForTimeout(1);
  
    const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
    const titleDiv = await bookCard.waitForSelector('.title-div');
    const firstBookTitle = await titleDiv.textContent('.book-card.title');
   
    expect(firstBookTitle).toBe('"Repent, Harlequin!"...');
  });

test('should update data when search is performed for title', async ({ page }) => {
  // Enter a search query in the search input field
  const searchQuery = 'Harry Potter'; 
  await page.fill('.search-input', searchQuery);

  // Trigger the search action
  await page.click('.navbar-button');

  // Wait for the data to update based on the search query
  await page.waitForTimeout(1);

  const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
  const titleDiv = await bookCard.waitForSelector('.title-div');
  const firstBookTitle = await titleDiv.textContent('.book-card.title');

  // Verify that the displayed result matches the expected outcome
  console.log(firstBookTitle);
  expect(firstBookTitle).toContain(searchQuery);
});

test('should update data when search is performed for author', async ({ page }) => {
  // Enter a search query in the search input field
  const searchQuery = 'Jo Nesbø';
  await page.fill('.search-input', searchQuery);

  // Trigger the search action
  await page.click('.navbar-button');

  // Wait for the data to update based on the search query
  await page.waitForTimeout(1);

  // Assuming the first book in the search results is displayed in the book card
  const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
  const titleDiv = await bookCard.waitForSelector('.title-div');
  const firstBookTitle = await titleDiv.textContent('.book-card.title');

  // Verify that the displayed result matches the expected outcome
  console.log(firstBookTitle);
  expect(firstBookTitle).toBe("Police");
});

// Test that search, sort and order work together
test('should update data when searching, sorting and ordering', async ({ page }) => {
  // Enter a search query in the search input field
  const searchQuery = 'John'; 
  await page.fill('.search-input', searchQuery);

  // Trigger the search action
  await page.click('.navbar-button');

  await page.selectOption('#genreSelect', 'Fiction');
  await page.selectOption('#orderBySelect', 'title');

  // Wait for the data to update based on the search query
  await page.waitForTimeout(1);

  // Assuming the first book in the search results is displayed in the book card
  const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
  const titleDiv = await bookCard.waitForSelector('.title-div');
  const firstBookTitle = await titleDiv.textContent('.book-card.title');

  // Verify that the displayed result matches the expected outcome
  console.log(firstBookTitle);
  expect(firstBookTitle).toBe("1919");
});


test('should navigate to book details page when a book card is clicked', async ({ page }) => {
  // Assuming the first book in the search results is displayed in the book card
  const bookCard = await page.waitForSelector('.book-card-container .book-card:first-child');
  const titleDiv = await bookCard.waitForSelector('.title-div');
  // Get the initial URL before clicking
  const initialUrl = page.url();

  // Simulate clicking on the book card
  await bookCard.click();
  
  // // Get the URL after clicking
  const newUrl = page.url();
  // // Verify that the URL has changed, indicating navigation to the book details page
  expect(newUrl).not.toBe(initialUrl);
  
  const bookTitle = await page.textContent('.bookPage-title');
  expect(bookTitle).toBe('CIRCUS RIDER'); 
});
