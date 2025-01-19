"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { auth } from "@/app/lib/firebase";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const returnUrl = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      redirect(`/user/login?returnUrl=${returnUrl}`);
    }
  }, [loading, user, returnUrl]);
  return <>{children}</>;
}

export default Protected;
