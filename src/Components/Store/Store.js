import GetStores from "./GetStores";

const Store = () => {
  const url = "https://app-munson-web-eastus-dev-003.azurewebsites.net/api/store";

  return (
    <>
      <GetStores endpoint={url} />
    </>
  );
};

export default Store;
