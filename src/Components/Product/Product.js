import GetProducts from "./GetProducts";

const Product = () => {
  const url = "https://app-munson-web-eastus-dev-003.azurewebsites.net/api/product";

  return (
    <>
      <GetProducts endpoint={url} />
    </>
  );
};

export default Product;
