import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteSale from "./DeleteSale";
import EditSale from "./EditSale";
import CreateSale from "./CreateSale";
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

const GetSales = ({ endpoint }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getItems();
  }, []);

  const getItems = () => {
    axios
      .get(endpoint)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setItems(res.data);
          setLoading(false);
          setError("");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const formatDate = (date) => {
    if (!date) {
      return "Could not find date";
    }
    return new Date(date).toString().slice(0, 15);
  };

  const createTable = () => {
    if (loading) {
      return <Button loading>Loading</Button>;
    }

    if (items.length <= 0) {
      return (
        <>
          <CreateSale getItemsFunc={getItems} endpoint={endpoint} />
          <h1>No Items Found</h1>
        </>
      );
    } else {
      return (
        <>
          {error && <p className="red">{error}</p>}
          <CreateSale getItemsFunc={getItems} endpoint={endpoint} />
          <Table celled>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Store</TableHeaderCell>
                <TableHeaderCell>DateSold</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.customer.name}</TableCell>
                    <TableCell>{item.store.name}</TableCell>
                    <TableCell>{formatDate(item.dateSold)}</TableCell>
                    <TableCell>
                      <EditSale
                        rowId={item.id}
                        product={item.product}
                        customer={item.customer}
                        store={item.store}
                        dateSold={item.dateSold}
                        endpoint={endpoint}
                        getItems={getItems}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteSale
                        endpoint={endpoint}
                        rowId={item.id}
                        getItems={getItems}
                        setError={setError}
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

  return <>{createTable()}</>;
};

GetSales.propTypes = {
  endpoint: PropTypes.string,
};

export default GetSales;
