import Menu from "./Menu";
import ProductManager from "./ProductManager";
import InvoiceGenerator from "./InvoiceGenerator";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Menu />
      {/* <ProductManager /> */}
      <InvoiceGenerator />
    </div>
  );
}

export default App;
