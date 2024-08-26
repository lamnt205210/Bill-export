import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function PopUpNewProduct() {
  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const errors = validateForm(formJson);

    if (Object.keys(errors).length === 0) {
      console.log(formJson);
      handleClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (form) => {
    const errors = {};
    if (!form.productName) {
      errors.productName = "Tên sản phẩm không được để trống";
    }
    if (!form.quantity || isNaN(form.quantity) || form.quantity <= 0) {
      errors.quantity = "Số lượng phải là một số dương";
    }
    if (!form.price || isNaN(form.price) || form.price <= 0) {
      errors.price = "Đơn giá phải là một số dương";
    }
    return errors;
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Thêm sản phẩm mới
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm sản phẩm mới</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="productName"
              name="productName"
              label="Tên sản phẩm"
              fullWidth
              variant="standard"
              error={!!formErrors.productName}
              helperText={formErrors.productName}
            />
            <TextField
              required
              margin="dense"
              id="quantity"
              name="quantity"
              label="Số lượng"
              type="number"
              fullWidth
              variant="standard"
              error={!!formErrors.quantity}
              helperText={formErrors.quantity}
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Đơn giá"
              type="number"
              fullWidth
              variant="standard"
              error={!!formErrors.price}
              helperText={formErrors.price}
            />
            <FormControlLabel
              control={<Checkbox name="return" />}
              label="Trả hàng"
            />
            <DialogActions>
              <Button type="submit" variant="contained">
                Thêm
              </Button>
              <Button onClick={handleClose}>Hủy</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
