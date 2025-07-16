import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <span>VibeGuide</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground">Enter your email to receive a password reset link</p>
          </div>
          
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
