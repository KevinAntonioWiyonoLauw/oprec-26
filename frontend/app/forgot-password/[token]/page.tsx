"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import MiniFooter from "@/components/MiniFooter";
import Image from "next/image";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import { Eye, EyeOff, Info } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

type PassresetPageProps = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = ({ params }: PassresetPageProps) => {
  const { token } = params;
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{}|\\;',./:<>?`~"-]{8,}$/,
      message: "Password must have at least 8 characters and contain one number."
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: data.newPassword }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login page...");
        setError("");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setError(responseData.error || "An error occurred");
        setSuccess("");
      }
    } catch (err) {
      setError("Failed to reset password");
      setSuccess("");
    }
  };

  return (
    <>
      <section>
        <Container
          className="flex flex-col items-center justify-center bg-custom-black"
          parentClass="min-h-screen"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute right-[-5%] top-[-10%] h-[800px] w-[800px] rounded-full bg-custom-blue/10 blur-[120px]" />
            <div className="absolute bottom-[19%] left-[-10%] h-[600px] w-[600px] rounded-full bg-custom-orange/10 blur-[100px]" />
          </div>
          <div className="relative gap-4 bg-custom-black rounded-lg border border-custom-silver/15 p-4 pt-10 flex w-full max-w-sm flex-col items-center">
            <Logos />
            <h1 className="text-center text-3xl font-semibold text-white">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm rounded-lg flex-col">
              <div className="space-y-2 mb-4">
                <label className={`${errors.newPassword && "text-red-500"}`}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={hidePassword ? "password" : "text"}
                    {...register("newPassword", passwordValidation)}
                    className={`w-full rounded-lg border border-white/10 bg-black/10 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.newPassword && "border-red-500"}`}
                  />
                  <span className="absolute right-1 top-1/2 -translate-y-1/2">
                    <div className="cursor-pointer p-2 text-custom-silver" onClick={() => setHidePassword(!hidePassword)}>
                      {hidePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </span>
                </div>
                {errors.newPassword && (
                  <p className="flex gap-1.5 text-sm text-red-500">
                    <Info size={10} className="mt-1 shrink-0" /> {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <label className={`${errors.confirmPassword && "text-red-500"}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={hideConfirmPassword ? "password" : "text"}
                    {...register("confirmPassword", { 
                      required: "Confirm password is required",
                      validate: (value) => value === newPassword || "Passwords do not match"
                    })}
                    className={`w-full rounded-lg border border-white/10 bg-black/10 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.confirmPassword && "border-red-500"}`}
                  />
                  <span className="absolute right-1 top-1/2 -translate-y-1/2">
                    <div className="cursor-pointer p-2 text-custom-silver" onClick={() => setHideConfirmPassword(!hideConfirmPassword)}>
                      {hideConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="flex gap-1.5 text-sm text-red-500">
                    <Info size={10} className="mt-1 shrink-0" /> {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
              {success && <p className="mb-4 text-sm text-green-500">{success}</p>}

              <div className="flex justify-center mt-6">
                <Button variant="secondary" type="submit" className="w-full">
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </Container>
        <MiniFooter />
      </section>
    </>
  );
};

export default ResetPasswordPage;

const Logos = () => (
  <div className="z-20 flex items-center gap-2">
    <Image src={himakom} alt="Logo Himakom" className="h-8 w-auto" />
    <Image src={omahti} alt="Logo OmahTI" className="h-8 w-auto" />
  </div>
);