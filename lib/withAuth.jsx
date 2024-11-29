"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";

export function withAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { session, isLoading } = useSelector((state) => state.user);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient || isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    if (!session) {
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
