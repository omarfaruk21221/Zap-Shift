import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import GoogleSignIn from "./SosialSignIn/GoogleSignIn";
import { toast } from "react-toastify";
const SignIn = () => {
  const location = useLocation();
  // console.log("sign in", location);
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = (data) => {
    console.log("after sign in ", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Sign In Successfull");
        navigate(location?.state || "/");
      })
      .then((err) => console.log(err));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full max-w-sm mx-auto space-y-4"
      >
        {/* ---------------- header title --------------- */}
        <legend>
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Welcome Back
          </h1>
          <p className="text-lg text-secondary/60 mb-8">
            Sign In with ZapShift
          </p>
        </legend>
        {/* ---------------------- form data-------------------------- */}
        <fieldset className="fieldset">
          {/* ====email field === */}
          <div className="flex flex-col gap-2 text-accent text-lg ">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input "
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-warning">Email is required</p>
            )}
          </div>
          {/* ==== password field ==== */}
          <div className="flex flex-col gap-2 text-accent text-lg ">
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Password must contain at least one lowercase and one uppercase letter",
                },
              })}
              className="input "
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-warning">{errors.password.message}</p>
            )}
          </div>
          <Link to="/forgetpassword" className=" underline text-secondary">
            Forget Password
          </Link>
          <div>
            {/* ----- reg in button ----- */}
            <p className="text-base-content/70 mt-2 text-sm">
              Don't have any account?
              <Link
                to="/signup"
                state={location.state}
                className=" font-medium ml-1 text-secondary/70 underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <button className="btn btn-primary mt-4">Sign In</button>
          {/* ----- divider ------ */}
          <div className="flex w-full flex-col">
            <div className="divider divider-secondary">OR</div>
          </div>
          {/* -------- google log in ----  */}
          <GoogleSignIn state={location.state} />
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
