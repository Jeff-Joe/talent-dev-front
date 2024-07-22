import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import PropTypes from "prop-types";
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

  const handleInputDate = (event) => {
    event.preventDefault();
    let formattedDate = event.target.value.replaceAll("/", "-");
    setItem({ ...item, dateSold: formattedDate });
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

  const isDateValid = (dateStr) => {
    return !isNaN(new Date(dateStr));
  };

  const handleSubmit = async () => {
    if (!isDateValid(item.dateSold)) {
      setError(true);
      return;
    } else {
      await axios
        .put(endpoint + "/" + rowId, item)
        .then((res) => {
          console.log(res);
          setError(false);
          getItems();
        })
        .catch((err) => console.log(err));
    }
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
          <FormField>
            <label>Date sold</label>
            <input
              type="text"
              value={item.dateSold.slice(0, 10).replaceAll("-", "/")}
              onChange={handleInputDate}
            />
            {error && (
              <p className="red">Please enter a date in format YYYY/MM/DD</p>
            )}
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
          onClick={async () => {
            await handleSubmit();
            if (isDateValid(item.dateSold)) setOpen(false);
          }}
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
