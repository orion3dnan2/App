import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, UserRole } from "../../shared/types";
import { AuthService } from "../lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isMerchant: boolean;
  isCustomer: boolean;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (resource: string, action: string) => boolean;
  login: (credentials: { username: string; password: string }) => Promise<User>;
  setAuthenticatedUser: (user: User, token: string) => void;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    try {
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error initializing auth:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshAuth = () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing auth:", error);
      setUser(null);
    }
  };

  const login = async (credentials: {
    username: string;
    password: string;
  }): Promise<User> => {
    try {
      setIsLoading(true);
      const loggedInUser = await AuthService.login(credentials);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthenticatedUser = (userData: User, token: string) => {
    try {
      // حفظ الرمز المميز
      localStorage.setItem("auth_token", token);
      // تعيين المستخدم
      setUser(userData);
    } catch (error) {
      console.error("Error setting authenticated user:", error);
    }
  };

  const logout = () => {
    try {
      AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  const hasRole = (role: UserRole): boolean => {
    try {
      return user?.role === role || false;
    } catch (error) {
      console.error("Error checking role:", error);
      return false;
    }
  };

  const hasPermission = (resource: string, action: string): boolean => {
    try {
      if (!user) return false;

      // Super admin has all permissions
      if (user.role === "super_admin") return true;

      return user.permissions.some((permission) => {
        const hasResource =
          permission.resource === "*" || permission.resource === resource;
        const hasAction =
          permission.actions.includes("*") ||
          permission.actions.includes(action);
        return hasResource && hasAction;
      });
    } catch (error) {
      console.error("Error checking permission:", error);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    isSuperAdmin: hasRole("super_admin"),
    isMerchant: hasRole("merchant"),
    isCustomer: hasRole("customer"),
    hasRole,
    hasPermission,
    login,
    setAuthenticatedUser,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export the context for testing purposes
export { AuthContext };
