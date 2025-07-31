import { User, UserRole } from "../../shared/types";

export class AuthService {
  private static readonly STORAGE_KEYS = {
    USER: "bayt_al_sudani_user",
    TOKEN: "bayt_al_sudani_token",
    PERMISSIONS: "bayt_al_sudani_permissions",
  };

  static async login(credentials: {
    username: string;
    password: string;
  }): Promise<User> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطأ في تسجيل الدخول");
      }

      // حفظ الرمز المميز والمستخدم
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }

      AuthService.setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static logout(): void {
    try {
      localStorage.removeItem(AuthService.STORAGE_KEYS.USER);
      localStorage.removeItem(AuthService.STORAGE_KEYS.TOKEN);
      localStorage.removeItem(AuthService.STORAGE_KEYS.PERMISSIONS);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  static getCurrentUser(): User | null {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return null;
      }
      const userStr = localStorage.getItem(AuthService.STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  static setCurrentUser(user: User): void {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return;
      }
      localStorage.setItem(AuthService.STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(
        AuthService.STORAGE_KEYS.TOKEN,
        `token_${user.id}_${Date.now()}`,
      );
      localStorage.setItem(
        AuthService.STORAGE_KEYS.PERMISSIONS,
        JSON.stringify(user.permissions),
      );
    } catch (error) {
      console.error("Error setting current user:", error);
    }
  }

  static isAuthenticated(): boolean {
    try {
      return AuthService.getCurrentUser() !== null;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }

  static hasRole(role: UserRole): boolean {
    try {
      const user = AuthService.getCurrentUser();
      return user?.role === role;
    } catch (error) {
      console.error("Error checking role:", error);
      return false;
    }
  }

  static hasPermission(resource: string, action: string): boolean {
    try {
      const user = AuthService.getCurrentUser();
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
  }

  static getUserRole(): UserRole | null {
    try {
      return AuthService.getCurrentUser()?.role || null;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  }

  static isSuperAdmin(): boolean {
    try {
      return AuthService.hasRole("super_admin");
    } catch (error) {
      console.error("Error checking super admin role:", error);
      return false;
    }
  }

  static isMerchant(): boolean {
    try {
      return AuthService.hasRole("merchant");
    } catch (error) {
      console.error("Error checking merchant role:", error);
      return false;
    }
  }

  static isCustomer(): boolean {
    try {
      return AuthService.hasRole("customer");
    } catch (error) {
      console.error("Error checking customer role:", error);
      return false;
    }
  }
}

// Create safe wrapper functions
const safeGetCurrentUser = (): User | null => {
  try {
    return AuthService.getCurrentUser();
  } catch (error) {
    console.error("Safe getCurrentUser error:", error);
    return null;
  }
};

const safeIsAuthenticated = (): boolean => {
  try {
    return AuthService.isAuthenticated();
  } catch (error) {
    console.error("Safe isAuthenticated error:", error);
    return false;
  }
};

const safeHasRole = (role: UserRole): boolean => {
  try {
    return AuthService.hasRole(role);
  } catch (error) {
    console.error("Safe hasRole error:", error);
    return false;
  }
};

const safeHasPermission = (resource: string, action: string): boolean => {
  try {
    return AuthService.hasPermission(resource, action);
  } catch (error) {
    console.error("Safe hasPermission error:", error);
    return false;
  }
};

const safeIsSuperAdmin = (): boolean => {
  try {
    return AuthService.isSuperAdmin();
  } catch (error) {
    console.error("Safe isSuperAdmin error:", error);
    return false;
  }
};

const safeIsMerchant = (): boolean => {
  try {
    return AuthService.isMerchant();
  } catch (error) {
    console.error("Safe isMerchant error:", error);
    return false;
  }
};

const safeIsCustomer = (): boolean => {
  try {
    return AuthService.isCustomer();
  } catch (error) {
    console.error("Safe isCustomer error:", error);
    return false;
  }
};

const safeLogin = async (credentials: {
  username: string;
  password: string;
}): Promise<User> => {
  try {
    return await AuthService.login(credentials);
  } catch (error) {
    console.error("Safe login error:", error);
    throw error;
  }
};

const safeLogout = (): void => {
  try {
    AuthService.logout();
  } catch (error) {
    console.error("Safe logout error:", error);
  }
};

// React hook for authentication with error handling
export const useAuth = () => {
  const user = safeGetCurrentUser();

  return {
    user,
    isAuthenticated: safeIsAuthenticated(),
    isSuperAdmin: safeIsSuperAdmin(),
    isMerchant: safeIsMerchant(),
    isCustomer: safeIsCustomer(),
    hasPermission: safeHasPermission,
    hasRole: safeHasRole,
    login: safeLogin,
    logout: safeLogout,
  };
};
