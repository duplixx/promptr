import React from "react";
import { useFormStatus } from "react-dom";

const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-second" : "bg-second"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-black`}
    >
      {pending ? "Loading..." : "Sign in"}
    </button>
  );
};

export default AuthButton;