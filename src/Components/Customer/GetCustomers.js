import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
import CreateCustomer from "./CreateCustomer";
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

const GetCustomers = ({ endpoint }) => {
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
        setLoading(false);
        setItems(res.data);
        let cols = Object.keys(res.data[0]).map((element) => {
          return element.charAt(0).toUpperCase() + element.slice(1);
        });
        setColumns(cols);
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
        <CreateCustomer getItemsFunc={getItems} endpoint={endpoint} />
        <h1>No Items Found</h1>
      </>
    );
  } else {
    return (
      <>
        <CreateCustomer getItemsFunc={getItems} endpoint={endpoint} />
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
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <EditCustomer
                      name={item.name}
                      address={item.address}
                      endpoint={endpoint}
                      rowId={item.id}
                      getItems={getItems}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteCustomer
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

GetCustomers.propTypes = {
  endpoint: PropTypes.string,
};

export default GetCustomers;
