import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase";
import { BiHide, BiShow } from "react-icons/bi";
import Swal from "sweetalert2";
import { useState } from "react";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [user, setUser] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setUser("");
    setRegisterError("");
    if (password.length < 6) {
      return Swal.fire(
        "Warning!",
        "Password should have 6 character or long.",
        "warning"
      );
    } else if (!/[A-Z][a-z]+/g.test(password)) {
      return Swal.fire(
        "Warning!",
        "Password should Capital, smaller and number like mixtype password.",
        "warning"
      );
    }
    // console.log(email, password);

    // create user

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const creatdUser = userCredential.user;
        setUser(creatdUser);
        Swal.fire(
          "Congratulations!",
          "Your account create succesful!",
          "success"
        );
      })
      .catch((error) => {
        setRegisterError(error.message);
        Swal.fire("Error!", "Account create Fail.", "error");
      });
  };
  console.log(user);
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {user && (
              <div>
                <h2 className="text-3xl">Email: {user.email}</h2>
                <p className="text-xl">API: {user.apiKey}</p>
                <p className="text-xl">UID: {user.uid}</p>
              </div>
            )}
            {registerError && (
              <p className="text-red-600 text-lg">{registerError}</p>
            )}
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="password"
                      required
                      name="password"
                      className="input w-full input-bordered pr-14"
                    />
                    <span
                      className="absolute right-2 text-xl cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <BiHide></BiHide> : <BiShow></BiShow>}
                    </span>
                  </div>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
