import {
  Box,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Add, Delete } from "@mui/icons-material";
import PopUpNewProduct from "./PopUpNewProduct";
export default function ProductAdd({
  invoiceItems,
  products,
  setInvoiceItems,
}) {
  const [checkReturn, setCheckReturn] = useState(false);

  const handleProductChange = (index, event) => {
    const selectedProduct = products.find(
      (product) => product.name === event.target.value
    );
    const updatedItems = [...invoiceItems];
    updatedItems[index].product = selectedProduct.name;
    updatedItems[index].price = selectedProduct.price;
    updatedItems[index].total =
      selectedProduct.price * updatedItems[index].quantity;
    setInvoiceItems(updatedItems);
  };

  const handleQuantityChange = (index, event) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].quantity = event.target.value;
    updatedItems[index].total = updatedItems[index].price * event.target.value;
    setInvoiceItems(updatedItems);
  };

  const handleReturnItemChange = (index, event) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].type = event.target.checked ? "return" : "add";
    setInvoiceItems(updatedItems);

    // Toggle the returnCheck state
    setCheckReturn(event.target.checked);
  };

  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { product: "", quantity: 1, price: 0, total: 0, type: "add" },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = invoiceItems.filter((item, i) => i !== index);
    setInvoiceItems(updatedItems);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trả hàng</TableCell>
            <TableCell sx={{ width: "40%" }}>Tên sản phẩm</TableCell>
            <TableCell sx={{ width: "20%" }}>Số lượng</TableCell>
            <TableCell>Đơn giá</TableCell>
            <TableCell>Thành tiền</TableCell>
            <TableCell>Xóa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={checkReturn}
                  onChange={(event) => handleReturnItemChange(index, event)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  select
                  value={item.product}
                  onChange={(event) => handleProductChange(index, event)}
                  fullWidth
                  size="small"
                >
                  {products.map((product) => (
                    <MenuItem key={product.name} value={product.name}>
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(index, event)}
                  fullWidth
                  size="small"
                />
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.total}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveItem(index)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        startIcon={<Add />}
        onClick={handleAddItem}
        color="primary"
        sx={{ marginRight: "20px" }}
        variant="outlined"
      >
        Thêm sản phẩm
      </Button>
      <PopUpNewProduct />
    </Box>
  );
}
