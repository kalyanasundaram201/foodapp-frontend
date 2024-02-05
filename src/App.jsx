import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartContextProvider } from "./store/CartContext";
import {UserProgresscontextProvider} from "./store/UserProgressContext";

function App() {
  return (
    <UserProgresscontextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgresscontextProvider>

  );
}

export default App;
