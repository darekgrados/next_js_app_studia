"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect, usePathname } from "next/navigation";

function Protected({ children }) {
  const { user } = useAuth();
  const returnUrl = usePathname();

  useLayoutEffect(() => {
    console.dir(user?.emailVerified);
    if (!user) {
      console.log("user not logged!");
      redirect(`/user/login?returnUrl=${returnUrl}`);
    }
    if (user?.emailVerified) {
      redirect("/user/login");
    }
  }, [user, returnUrl]);
  return <>{children}</>;
}

export default Protected;
