const NotAvailableForMobile = () => {
  return (
    <div className="bg-hero-pattern bg-center bg-cover w-full h-screen sm:hidden">
      <h1 className="sm:hidden absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white text-2xl">
        Sorry, this app is currently unavailable on small devices
      </h1>
    </div>
  );
};
export default NotAvailableForMobile;
