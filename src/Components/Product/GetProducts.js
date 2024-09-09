import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import CreateProduct from "./CreateProduct";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  Table,
  Button,
} from "semantic-ui-react";

const GetProducts = ({ endpoint }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setLoading(true);
    getItems();
  }, []);

  const getItems = () => {
    axios
      .get(endpoint)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setLoading(false);
          setItems(res.data);
          let cols = Object.keys(res.data[0]).map((element) => {
            return element.charAt(0).toUpperCase() + element.slice(1);
          });
          setColumns(cols);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <Button loading>Loading</Button>;
  }

  if (items.length <= 0) {
    return (
      <>
        <CreateProduct getItemsFunc={getItems} endpoint={endpoint} />
        <h1>No Items Found</h1>
      </>
    );
  } else {
    return (
      <>
        <CreateProduct getItemsFunc={getItems} endpoint={endpoint} />
        <Table celled>
          <TableHeader>
            <TableRow>
              {columns.map((item, i) => (
                <TableHeaderCell key={i + 1}>{item}</TableHeaderCell>
              ))}
              <TableHeaderCell>Actions</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <EditProduct
                      name={item.name}
                      price={item.price}
                      endpoint={endpoint}
                      rowId={item.id}
                      getItems={getItems}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteProduct
                      endpoint={endpoint}
                      rowId={item.id}
                      getItems={getItems}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter></TableFooter>
        </Table>
      </>
    );
  }
};

GetProducts.propTypes = {
  endpoint: PropTypes.string,
};

export default GetProducts;
