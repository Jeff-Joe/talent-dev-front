import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";
import CreateStore from "./CreateStore";
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

const GetStores = ({ endpoint }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);
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
          setLoading(false);
          setItems(res.data);
          let cols = Object.keys(res.data[0]).map((element) => {
            return element.charAt(0).toUpperCase() + element.slice(1);
          });
          setColumns(cols);
          setError("");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const createTable = () => {
    if (loading) {
      return <Button loading>Loading</Button>;
    }

    if (items.length <= 0) {
      return (
        <>
          <CreateStore getItemsFunc={getItems} endpoint={endpoint} />
          <h1>No Items Found</h1>
        </>
      );
    } else {
      return (
        <>
          {error && <p className="red">{error}</p>}
          <CreateStore getItemsFunc={getItems} endpoint={endpoint} />
          <Table celled>
            <TableHeader>
              <TableRow>
                {columns.map((item, i) => (
                  <TableHeaderCell key={i}>{item}</TableHeaderCell>
                ))}
                <TableHeaderCell>Actions</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>
                      <EditStore
                        name={item.name}
                        address={item.address}
                        endpoint={endpoint}
                        rowId={item.id}
                        getItems={getItems}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteStore
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

GetStores.propTypes = {
  endpoint: PropTypes.string,
};

export default GetStores;
