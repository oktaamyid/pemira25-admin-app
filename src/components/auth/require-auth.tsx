"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
     const { user, loading } = useAuth();
     const router = useRouter();

     useEffect(() => {
          if (!loading && !user) {
               router.push("/login");
          }
     }, [user, loading, router]);

     if (loading) {
          return (
               <div className="flex h-screen w-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Memuat sesi...</span>
               </div>
          );
     }

     if (!user) {
          return null; // Will redirect via useEffect
     }

     return <>{children}</>;
}
