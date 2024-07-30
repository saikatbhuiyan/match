import Link from "next/link";
import React from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <div className="flex items-center justify-center vertical-center">
        <RegisterForm />
      </div>
    </div>
  );
}
