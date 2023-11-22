    import "@testing-library/jest-dom/vitest";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { fireEvent, render, screen, waitFor } from "@testing-library/react";
    import '@testing-library/jest-dom';
    import Select from "../pages/HomePage/components/Select";
    import BookCardContainer from "../pages/HomePage/components/BookCardContainer";
    import { BookCardProps } from "../types/BookCardProps";
    


    const queryClient = new QueryClient();

    describe("Select Test", () => {
        const mockBook1 = {
            _id : "4",
            title: "Harry Potter",
            author: "J.K. Rowling",
            year: 1997,
            rating: 4.5,
            genre: "Fantasy",
            description: "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
            pages: 223,
            language: "English",
            onClick: () => { },

        };
        const  mockBook2 = {
            _id : "5",
            title: "Star Wars",
            author: "George Lucas",
            year: 1977,
            rating: 4.5,
            genre: "Science Fiction",
            description: "Star Wars is an American epic space opera media franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop-culture phenomenon.",
            pages: 223,
            language: "English",
            onClick: () => { },
        }

        const books = [mockBook2, mockBook1]
        let sortedBooks = [...books]; // This will hold the sorted books
        const chosenOrder = 'title';
        const orderBy = (property: keyof BookCardProps) => {
            sortedBooks = [...books].sort((a, b) => {
                const valueA = a[property];
                const valueB = b[property];
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            });
        };
        const renderHomePage = () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Select chosenOrder={chosenOrder} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        orderBy(e.target.value as keyof BookCardProps);
                        // Trigger a re-render with the sorted books
                        renderBookCardContainer();
                    }} type='order' />
                    {/* Render the BookCardContainer initially */}
                    <div id="bookCardContainer"></div>
                </QueryClientProvider>
            );
        };
        
        const renderBookCardContainer = () => {
            const container = document.getElementById('bookCardContainer');
            // Render BookCardContainer inside the container div
            if (container) {
                // Render BookCardContainer inside the container div
                render(
                    <BookCardContainer books={sortedBooks} handleCardClick={() => { }} />,
                    { container }
                );
            }
        };
        
        test("Check if order changes on selecting title", async () => {
            renderHomePage();
        
            // Fire change event on select
            fireEvent.change(screen.getByTestId('orderBySelect'), { target: { value: 'title' } });
        
            // Wait for the state to update and UI to re-render
            await waitFor(() => {
                // Get all the book titles
                const bookTitles = screen.getAllByTestId('book-card-title').map(title => title.textContent);
                // Check if the first book title is 'Harry Potter'
                expect(bookTitles[0]).toBe('Harry Potter');
                // Optionally, you can check the order of all books
                expect(bookTitles).toEqual(['Harry Potter', 'Star Wars']);
            });
        
            // Debug to see the current state of the DOM (optional)
            screen.debug();
        });
        
            
    });