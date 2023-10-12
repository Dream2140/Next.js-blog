const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    </div>
  );
};

export default Loading;
