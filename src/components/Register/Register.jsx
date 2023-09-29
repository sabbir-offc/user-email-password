import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../firebase/firebase";
import { BiHide, BiShow } from "react-icons/bi";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [user, setUser] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

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
    } else if (!terms) {
      return Swal.fire(
        "Error!",
        "You must Accept our terms and condition",
        "error"
      );
    }
    // console.log(email, password);

    // create user

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const creatdUser = userCredential.user;
        setUser(creatdUser);

        //send email verification
        sendEmailVerification(creatdUser)
          .then(() => {
            return Swal.fire(
              "Success!",
              "Please Check your email for verification.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error.message);
            return Swal.fire(
              "error",
              "Email verification link send failed.",
              "error"
            );
          });
        Swal.fire("Success!", "Registration Successfull.", "success");
      })
      .catch((error) => {
        setRegisterError(error.message);
        Swal.fire("Error!", "Account create Fail.", "error");
      });
  };
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
                  <div className="flex items-center gap-2 mt-5">
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">
                      Accept Our <a href="">Terms and Condition.</a>
                    </label>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                  />
                </div>
              </form>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
