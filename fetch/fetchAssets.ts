import { getAllProducts } from "./productsList";

function fetchAsset(ref, assetData) {

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (assetData.hasOwnProperty(ref)) {
        resolve(assetData[ref]);
      } else {
        reject(new Error(`Asset not found for reference ID: ${ref}`));
      }
    }, 1000);
  });
}

const FetchAssets = async () => {
  try {
    const assetData = await getAllProducts();
    
    const assets = assetData.map(async (data) => {
      try {
        const asset = await fetchAsset(data.Image.asset._ref, assetData);
        return asset;
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    const assetResults = await Promise.all(assets);
    console.log(assetResults);
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
};

FetchAssets();

export default FetchAssets;
