import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Customer from "./pages/Customer";
import Cart from "./pages/Cart";
import GlobalStyles from "./components/GlobalStyles";
import OrderComplete from "./pages/OrderComplete";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccountEdit from "./pages/AccountEdit";
import Wishlist from "./pages/Wishlist";
import AddressEdit from "./pages/AddressEdit";
import DetailProduct from "./components/ShopMainArea/DetailProduct/DetailProduct";
import NotFound from "./components/NotFound";
import CheckoutOrderPage from "./pages/CheckoutOrderPage";
import OrderCompleteArea from "./components/OrderCompleteArea copy";

function App() {


  return (
    <GlobalStyles>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
            <Route path="/shop" element={<Shop />}>
            </Route>
            <Route path="/shop/:productId" element={<DetailProduct />}></Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/register" element={<Register />}>
            </Route>
            <Route path="/my-account/*" element={<Customer />}>
            </Route>
            <Route path="/contact" element={<Contact />}>
            </Route>
            <Route path="/cart" element={<Cart />}>
            </Route>
            <Route path="/wishlist" element={<Wishlist />}>
            </Route>
            <Route path="/order-complete" element={<OrderComplete />}>
            </Route>
            <Route path="/account-edit" element={<AccountEdit />}>
            </Route>
            <Route path="/address-edit/*" element={<AddressEdit />}>
            </Route>
            <Route path="/checkout-order/" element={<CheckoutOrderPage />}>
            </Route>
            <Route path="/order-completed" element={<OrderCompleteArea />} />
            <Route path="*" element={<NotFound />}>
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </GlobalStyles>
  )
};

export default App;