import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/HomePage.tsx";
import BookPage from "./pages/BookPage/BookPage.tsx";
import Navbar from "./components/Navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SearchProvider } from "./hooks/searchContext.tsx";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/project2/" element={<Homepage />} />
            <Route path="/project2/book/:bookId" element={<BookPage />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </SearchProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
