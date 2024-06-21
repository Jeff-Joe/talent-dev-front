import { Route, Routes } from "react-router-dom";
import "./Css/App.css";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import Sales from "./Components/Sales/Sales";
import Customer from "./Components/Customer/Customer";
import Product from "./Components/Product/Product";
import Store from "./Components/Store/Store";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
