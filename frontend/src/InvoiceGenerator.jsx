import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import ProductAdd from "./components/ProductAdd";
import GeneratePDF from "./features/GeneratePDF";
/////

const products = [
  { name: "Xi măng", price: 100000 },
  { name: "Gạch", price: 5000 },
  { name: "Cát", price: 200000 },
];

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([
    { product: "", quantity: 1, price: 0, total: 0, type: "add" },
  ]);
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().substr(0, 10)
  ); // Lấy ngày hiện tại làm giá trị mặc định

  const handleGeneratePDF = () => {
    GeneratePDF(invoiceItems, customerName, phone, address, invoiceDate);
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tạo hóa đơn
      </Typography>
      <TextField
        label="Tên khách hàng"
        variant="standard"
        fullWidth
        size="small"
        margin="normal"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <TextField
        variant="standard"
        label="Số điện thoại"
        size="small"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Địa chỉ"
        variant="standard"
        size="small"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Box sx={{ display: "inline" }}>
        <label>Ngày lập hóa đơn</label>
        <input
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          style={{
            display: "block",
            marginBottom: "16px",
            padding: "10px",
          }}
        />
      </Box>

      <ProductAdd
        invoiceItems={invoiceItems}
        products={products}
        setInvoiceItems={setInvoiceItems}
      />

      <br />
      <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
        Xuất hóa đơn
      </Button>
    </Container>
  );
};

export default InvoiceGenerator;
