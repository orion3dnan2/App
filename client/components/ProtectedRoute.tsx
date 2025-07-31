import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "../../shared/types";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: {
    resource: string;
    action: string;
  };
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();

  // Use try-catch to handle any potential errors
  try {
    const { isAuthenticated, isLoading, hasRole, hasPermission } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      return <Navigate to={fallbackPath} state={{ from: location }} replace />;
    }

    // Check role requirement
    if (requiredRole && !hasRole(requiredRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    // Check permission requirement
    if (
      requiredPermission &&
      !hasPermission(requiredPermission.resource, requiredPermission.action)
    ) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    console.error("ProtectedRoute error:", error);
    // If there's an error, redirect to login
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }
}

// Helper components for specific roles with error handling
export function SuperAdminRoute({ children }: { children: ReactNode }) {
  try {
    return (
      <ProtectedRoute requiredRole="super_admin">{children}</ProtectedRoute>
    );
  } catch (error) {
    console.error("SuperAdminRoute error:", error);
    return <Navigate to="/login" replace />;
  }
}

export function MerchantRoute({ children }: { children: ReactNode }) {
  try {
    return <ProtectedRoute requiredRole="merchant">{children}</ProtectedRoute>;
  } catch (error) {
    console.error("MerchantRoute error:", error);
    return <Navigate to="/login" replace />;
  }
}

export function AdminOrMerchantRoute({ children }: { children: ReactNode }) {
  try {
    const { isSuperAdmin, isMerchant, isLoading } = useAuth();

    // Show loading state
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (!isSuperAdmin && !isMerchant) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    console.error("AdminOrMerchantRoute error:", error);
    return <Navigate to="/login" replace />;
  }
}
