import SellerDashboard from '../../../components/dashboard';

const SellerPage = (params) => {
  const sellerId=params.params
  console.log("seller id from sellerDashboard is",params.params.sellerId)
  return (
    <div>
   
      <SellerDashboard sellerId={sellerId} />
    </div>
  );
};

export default SellerPage;
