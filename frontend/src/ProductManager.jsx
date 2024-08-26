import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Delete, Edit, Save } from "@mui/icons-material";

const ProductManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { name: "Xi măng", price: 100000 },
    { name: "Gạch", price: 5000 },
    { name: "Cát", price: 200000 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", price: "" });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { ...newProduct, price: Number(newProduct.price) },
    ]);
    setNewProduct({ name: "", price: "" });
  };

  const handleEditProductChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProduct = (index) => {
    setEditingProductIndex(index);
    setEditedProduct(products[index]);
  };

  const handleSaveEditedProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...editedProduct,
      price: Number(editedProduct.price),
    };
    setProducts(updatedProducts);
    setEditingProductIndex(null);
    setEditedProduct({ name: "", price: "" });
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Đơn giá sản phẩm
      </Typography>
      <TextField
        label="Tìm kiếm sản phẩm"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Đơn giá</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                {editingProductIndex === index ? (
                  <TextField
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditProductChange}
                  />
                ) : (
                  product.name
                )}
              </TableCell>
              <TableCell>
                {editingProductIndex === index ? (
                  <TextField
                    name="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={handleEditProductChange}
                  />
                ) : (
                  product.price
                )}
              </TableCell>
              <TableCell>
                {editingProductIndex === index ? (
                  <IconButton onClick={() => handleSaveEditedProduct(index)}>
                    <Save />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleEditProduct(index)}>
                    <Edit />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDeleteProduct(index)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField
                name="name"
                label="Tên sản phẩm mới"
                value={newProduct.name}
                onChange={handleNewProductChange}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                name="price"
                type="number"
                label="Đơn giá mới"
                value={newProduct.price}
                onChange={handleNewProductChange}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <Button
                startIcon={<Add />}
                onClick={handleAddProduct}
                color="primary"
                variant="contained"
              >
                Thêm sản phẩm
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default ProductManager;
