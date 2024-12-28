import { useAuth } from "@/app/lib/firebase/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function Protected({ children }) {
  const user = useAuth();
  const returnUrl = usePathname();

  useLayoutEffect(() => {
    if (!user) {
      console.log("User not logged!");
      redirect(`/users/login?returnUrl=${returnUrl}`);
    }

    if (!user.emailVerified) {
      console.log("User not verified!");
      redirect("/users/verified");
    }
  }, []);

  return <>{children}</>;
}

export default Protected;
