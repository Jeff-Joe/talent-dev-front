import GetCustomers from "./GetCustomers";

const Customer = () => {
  const url =
    "https://app-munson-web-eastus-dev-003.azurewebsites.net/api/customer";

  return (
    <>
      <GetCustomers endpoint={url} />
    </>
  );
};

export default Customer;
