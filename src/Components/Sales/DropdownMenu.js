import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";

const DropdownMenu = ({ endpoint, handleInput, placeholder }) => {
  const [items, setItems] = useState([
    {
      key: "",
      text: "",
      value: "",
    },
  ]);

  useEffect(() => getItems(), []);

  const getItems = () => {
    axios
      .get(endpoint)
      .then((res) => {
        let itemsArray = res.data.map((item) => ({
          key: item.id,
          text: item.name,
          value: item.id,
        }));
        setItems(itemsArray);
      })
      .then(() => console.log(items))
      .catch((err) => console.log(err));
  };

  return (
    <Dropdown
      placeholder={placeholder}
      fluid
      selection
      options={items}
      onChange={handleInput}
    />
  );
};

DropdownMenu.propTypes = {
  endpoint: PropTypes.string,
  handleInput: PropTypes.func,
  placeholder: PropTypes.string,
};

export default DropdownMenu;
