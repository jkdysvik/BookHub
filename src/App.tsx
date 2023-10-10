import './App.css'
import Navbar from './components/Navbar'

function App() {

  const handleSearch = (query: string) => {
    console.log(query)
  }

  return (
    <>
      <Navbar handleSearch={handleSearch} />
    </>
  );
}

export default App
