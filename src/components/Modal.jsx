const Modal = () => {
  return (
    <div className="backdrop absolute top-0 left-0 bg-black/50 w-full h-screen">
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-main-blue/90 w-4/5 max-w-2xl p-24 rounded-lg flex justify-center items-center text-3xl shadow-lg">
        YOU LOST
      </div>
    </div>
  );
};
export default Modal;
