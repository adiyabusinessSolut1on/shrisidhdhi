"use client";
import { KeyboardEvent, useRef, useState } from "react";
import { useLogin, useLoginverify } from "../network-request/mutations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../components/loader";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isOTPsendt, setIsotpSent] = useState<Boolean>(false);
  const [loadeing, setloading] = useState(false);
  const router = useRouter();
  const { mutate } = useLogin();
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    setloading(true);
    e.preventDefault();
    const toastId = toast.loading("Checking Information, please wait...");
    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          setloading(false);
          if (response?.data.success) {
            setIsotpSent(true);
          }
          console.log("data>>", response?.data.success);
          toast.update(toastId, {
            render: response?.data?.message || "Success!",
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        },
        onError: (error) => {
          toast.update(toastId, {
            render: "An error occurred!",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        },
      }
    );
  };
  return (
    <>
      {loadeing && <Loader />}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
            {isOTPsendt ? "Verify Email" : "Login"}
          </h2>
          {isOTPsendt ? (
            <OTPVerify email={email} onclickSing={() => setloading(true)} />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
export default Login;

interface prop {
  email: string;
  onclickSing: () => void;
}
const OTPVerify = ({ email, onclickSing }: prop) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const router = useRouter();
  const { mutate } = useLoginverify();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (otp === null) return;
    onclickSing();
    e.preventDefault();
    const toastId = toast.loading("Checking Information, please wait...");
    const numberOtp = +otp.join("");
    console.log(numberOtp);
    mutate(
      { email, numberOtp },
      {
        onSuccess: (response) => {
          console.log("Every >re>>", response);
          if (response?.data.success) {
            router.push("/");
          }
          toast.update(toastId, {
            render: response?.data?.message || "Success!",
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        },
        onError: (error) => {
          console.log(error);
          toast.update(toastId, {
            render: "An error occurred!",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        },
      }
    );
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index - 1] = "";
          return newOtp;
        });
      } else {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index] = "";
          return newOtp;
        });
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || isNaN(parseInt(value))) return; // Ensure only single numeric character is entered

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Enter OTP
          </label>

          <div className="flex justify-between w-full gap-4 ">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="shadow appearance-none border rounded w-full text-center px-2 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>

        <div className="grid items-center">
          <button
            className="bg-blue-500 justify-self-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            verify
          </button>
        </div>
      </form>
    </>
  );
};
