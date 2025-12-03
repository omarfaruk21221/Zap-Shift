import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import updateImg from "../../assets/image-upload-icon.png";
import useAuth from "../../Hooks/useAuth";
import GoogleSignIn from "./SosialSignIn/GoogleSignIn";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // console.log("after register", location);

  // ---- create user feature ----
  const handleRegistation = (data) => {
    // console.log("after reg", data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        ////// uploade img input
        const formData = new FormData();
        formData.append("image", profileImg);
        const imageUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(imageUrl, formData).then((res) => {
          console.log("after ime up", res.data.data.display_url);
          const userImg = res.data.data.display_url;
          ///create user at the mongodb
          const userInfo = {
            displayName: data.name,
            photoURL: userImg,
            email: data.email,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            console.log("user create in the database", res.data);
          });
          //// update profile to firebase
          const updateProfile = {
            displayName: data.name,
            photoURL: userImg,
          };
          updateUserProfile(updateProfile)
            .then(() => {
              // console.log("user profile update done");
              toast.success("User profile update done");
            })
            .then((error) => console.log(error));
        });
        toast.success("SignUp Successful");
        navigate("/signin");
      })
      .then((error) => toast.error(error.message));
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleRegistation)}
        className="w-full max-w-sm mx-auto space-y-4"
      >
        {/* ---------------- header title --------------- */}
        <legend>
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Create an Account
          </h1>
          <p className="text-lg text-secondary/60 mb-8">
            Sign Up with ZapShift
          </p>
        </legend>
        {/* ---------------------- form data-------------------------- */}
        <fieldset className="fieldset">
          {/* Image upload field */}
          <div className="">
            <label className="label" htmlFor="image">
              <img src={updateImg} alt="" />
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("photo", { required: "Image is required" })}
              className=""
            />
            {errors.image && (
              <p className="text-warning">{errors.image.message}</p>
            )}
          </div>
          {/* ====Name field === */}
          <div className="flex flex-col gap-2 text-accent text-lg ">
            <label className="label ">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input "
              placeholder="Email"
            />
          </div>
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
          <div>
            {/* ----- reg in button ----- */}
            <p className="text-base-content/70 mt-2 text-sm">
              Already have an account?
              <Link
                state={location.state}
                to="/signin"
                className=" font-medium ml-1 text-secondary/70 underline"
              >
                Sign In
              </Link>
            </p>
          </div>
          <button className="btn btn-primary mt-4">Sign Up</button>
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

export default SignUp;
