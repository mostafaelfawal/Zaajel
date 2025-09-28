import { useState } from "react";
import { FaDove, FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import { auth, db } from "../firebase";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import type { inputType } from "../types/form_typs";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";
import type { UserType } from "../types/userType";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState<inputType>({});
  const saveUserToFireStore = ({ id, name, email, avatar }: UserType): void => {
    const userRef = doc(db, "users", id);
    setDoc(userRef, {
      name: name,
      email: email,
      avatar: avatar,
    });
  };

  function validateForm() {
    const newErrors: inputType = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (isSignup) {
      if (!name.firstName) newErrors.firstName = "first name is required";
      if (!name.lastName) newErrors.lastName = "last name is required";
    }

    return newErrors;
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(
        !isSignup
          ? `Welcome back ${user.displayName || "User"} 👋`
          : `Account created successfully 🎉 \n Welcome ${user.displayName} to Zaajel`
      );
      saveUserToFireStore({
        id: user.uid,
        name: user.displayName || "User",
        email: user.email || "No Email",
        avatar: user.photoURL || "",
      });
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code != "auth/cancelled-popup-request"
      ) {
        toast.error(error.message);
      }
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email 📩");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email");
        } else {
          toast.error(error.message);
        }
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return setLoading(false);

    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    if (isSignup) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        const fullName = `${name.firstName.trim()} ${name.lastName.trim()}`;

        await updateProfile(user, {
          displayName: fullName,
        });

        // ✨ حفظ بيانات المستخدم في Firestore
        saveUserToFireStore({
          id: user.uid,
          name: fullName,
          email: user.email || "No Email",
          avatar: "",
        });

        toast.success(
          `Account created successfully 🎉 \n Welcome ${fullName} to Zaajel`
        );
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/email-already-in-use") {
            setErrors({
              email: "Email already exists, please login",
            });
          } else {
            toast.error(error.message);
          }
        }
        setLoading(false);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const displayName = userCredential.user.displayName || "";
        toast.success(`Welcome back ${displayName}👋`);
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/invalid-credential") {
            toast.error("the password or email invalid!");
          }
        }
        setLoading(false);
      }
    }
  }

  function signUp() {
    setIsSignup(!isSignup);
    setErrors({});
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-zaajel-secondary px-4 py-10">
      <div className="bg-white rounded-2xl flex flex-col sm:flex-row overflow-hidden shadow-2xl max-w-4xl w-full">
        {/* Left Section */}
        <div className="sm:w-2/5 bg-gradient-to-br from-zaajel-primary to-zaajel-secondary p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative Animated Circles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 right-12 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-white/5 rounded-full animate-pulse"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FaDove className="text-zaajel-primary text-4xl animate-bounce" />
            </div>

            {/* App Name */}
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
              Zaajel
            </h1>

            {/* Tagline */}
            <p className="text-zaajel-text-secondary text-sm mb-8 max-w-xs">
              Connect with your world in a smarter, faster way
            </p>

            {/* Subtitle */}
            <div className="hidden sm:block">
              <h2 className="text-2xl font-semibold text-white mb-3">
                {isSignup ? "Join Our Community" : "Welcome Back"}
              </h2>
              <p className="text-zaajel-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                {isSignup
                  ? "Create your account and start connecting with friends and family instantly."
                  : "Log in to continue your conversations and never miss a moment."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="sm:w-1/2 bg-white p-10 flex flex-col justify-center">
          <div className="text-center mb-8 sm:hidden">
            <h2 className="text-2xl font-semibold text-zaajel-dark mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isSignup
                ? "Sign up to get started with Zaajel"
                : "Log in to continue your conversations"}
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Info
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <InputField
                    id="firstName"
                    label="First name"
                    type="text"
                    value={name.firstName}
                    onChange={(e) =>
                      setName({ ...name, firstName: e.target.value })
                    }
                    error={errors.firstName}
                  />
                  <InputField
                    id="lastName"
                    label="Last name"
                    type="text"
                    value={name.lastName}
                    onChange={(e) =>
                      setName({ ...name, lastName: e.target.value })
                    }
                    error={errors.lastName}
                  />
                </div>
              </>
            )}

            <h3 className="text-lg font-semibold text-gray-800">
              {isSignup ? "Account Details" : "Login Details"}
            </h3>

            <InputField
              id="email"
              label="Email Address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope />}
              error={errors.email}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FaLock />}
              togglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
              error={errors.password}
            />

            {!isSignup && (
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-zaajel-primary border-gray-300 rounded"
                    checked={remember}
                    onChange={(e) => setRemember(e.currentTarget.checked)}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-zaajel-primary hover:text-zaajel-secondary transition duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-zaajel-primary to-zaajel-secondary text-white py-4 px-4 rounded-xl font-semibold text-lg transform transition duration-200 shadow-lg hover:shadow-xl ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-zaajel-secondary hover:to-zaajel-accent hover:scale-[1.02]"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="rounded-full size-5 border-2 border-white border-b-transparent animate-spin"></span>
                </>
              ) : isSignup ? (
                "Join Zaajel"
              ) : (
                "Log in"
              )}
            </button>

            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">Or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transform hover:scale-[1.02] transition duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-teal-500" />
              Continue with Google
            </button>

            <p className="text-sm text-gray-600 text-center mt-6">
              {isSignup
                ? "Already have an account? "
                : "Don’t have an account? "}
              <span
                onClick={signUp}
                className="text-zaajel-primary hover:text-zaajel-secondary font-medium cursor-pointer transition duration-200"
              >
                {isSignup ? "Log in" : "Sign up for free"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
