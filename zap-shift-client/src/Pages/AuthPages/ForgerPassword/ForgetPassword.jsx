import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // ------ forget password feature -----
  const handleForgetPassword = (data) => {
    console.log("forget data", data);
    navigate("/veifycode");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleForgetPassword)}
        className="w-full max-w-sm mx-auto space-y-4"
      >
        {/* ---------------- header title --------------- */}
        <legend>
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Forget Password
          </h1>
          <p className="text-lg text-secondary/60 mb-8">
            Enter your email address and we’ll send you a reset link.
          </p>
        </legend>

        {/* ---filed --- */}
        <fieldset className="fieldset">
          {/* ====email field === */}

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full "
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-warning">Email is required</p>
            )}


          {/* -------- button ---  */}
          <button className="btn btn-primary mt-4">Send</button>

          {/* ----- remember  ----- */}
            <p className="text-base-content/70 mt-2 text-sm">
             Remember your password?
              <Link
                to="/signin"
                className=" font-medium ml-1 text-secondary/70 underline"
              >
                Sign In
              </Link>
            </p>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgetPassword;
