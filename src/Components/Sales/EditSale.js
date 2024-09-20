import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  FormField,
  Form,
  Icon,
} from "semantic-ui-react";

function EditSale({
  rowId,
  product,
  customer,
  store,
  dateSold,
  endpoint,
  getItems,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [item, setItem] = useState({
    id: rowId,
    productId: product.id,
    customerId: customer.id,
    storeId: store.id,
    dateSold: dateSold,
  });

  const handleInputDate = (date) => {
    setItem({ ...item, dateSold: date });
  };

  const handleInputCustomer = (event, data) => {
    event.preventDefault();
    setItem({ ...item, customerId: data.value });
  };

  const handleInputProduct = (event, data) => {
    event.preventDefault();
    setItem({ ...item, productId: data.value });
  };

  const handleInputStore = (event, data) => {
    event.preventDefault();
    setItem({ ...item, storeId: data.value });
  };

  const handleSubmit = async () => {
    if (!rowId) {
      setItem({
        id: rowId,
        productId: product.id,
        customerId: customer.id,
        storeId: store.id,
        dateSold: dateSold,
      });
      setOpen(false);
      return;
    }
    await axios
      .put(endpoint + "/" + rowId, item)
      .then(() => {
        setOpen(false);
        setError(false);
        getItems();
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="yellow">
          <Icon name="edit outline" />
          Edit
        </Button>
      }
    >
      <ModalHeader>Edit Sale</ModalHeader>
      <ModalContent>
        <Form>
          {error && <p className="red">{error}</p>}
          <FormField>
            <label>Date sold</label>
            <DatePicker
              selected={item.dateSold}
              onChange={(date) => {
                handleInputDate(date);
              }}
            />
          </FormField>
          <FormField>
            <label>Product</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/product"
              handleInput={handleInputProduct}
              placeholder={product.name}
            />
          </FormField>
          <FormField>
            <label>Customer</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/customer"
              handleInput={handleInputCustomer}
              placeholder={customer.name}
            />
          </FormField>
          <FormField>
            <label>Store</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/store"
              handleInput={handleInputStore}
              placeholder={store.name}
            />
          </FormField>
        </Form>
      </ModalContent>
      <ModalActions>
        <Button
          color="black"
          onClick={() => {
            setError(false);
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          content="Edit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </ModalActions>
    </Modal>
  );
}

EditSale.propTypes = {
  rowId: PropTypes.number,
  product: PropTypes.object,
  customer: PropTypes.object,
  store: PropTypes.object,
  dateSold: PropTypes.string,
  endpoint: PropTypes.string,
  getItems: PropTypes.func,
};

export default EditSale;
