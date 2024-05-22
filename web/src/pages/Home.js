const Home = () => {
  return (
    <div className="bg-bg h-screen">
      <div className="flex justify-center items-center h-full flex-col">
        <p className="text-headline font-roboto text-3xl">
          You are not logged in
        </p>
        <button
          className="bg-button text-main font-roboto text-lg mt-4 px-4 py-2 rounded-lg hover:bg-hoverbtn"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Click here to login
        </button>
      </div>
    </div>
  );
};

export default Home;
