import GetSale from "./GetSales";

const Sales = () => {
  const url = "https://app-munson-web-eastus-dev-003.azurewebsites.net/api/sales";

  return (
    <>
      <GetSale endpoint={url} />
    </>
  );
};

export default Sales;
