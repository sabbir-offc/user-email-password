const Register = () => {
  return (
    <div>
      <h2 className="text-3xl mb-5">Please Register</h2>
      <div className="mx-auto p-4 border w-full">
        <form>
          <input
            className="px-4 py-3 mb-3 text-black dark:text-white font-medium text-lg rounded-lg border border-lime-500 w-3/4"
            type="email"
            placeholder="Enter your email."
            name=""
            id=""
          />
          <br />
          <input
            className="px-4 py-3 mb-3 text-black dark:text-white font-medium text-lg rounded-lg border border-lime-500 w-3/4"
            type="password"
            placeholder="Enter your password."
            name=""
            id=""
          />
          <br />
          <input
            className="px-5 py-3 bg-violet-500 text-white font-bold rounded-md border-none cursor-pointer"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
