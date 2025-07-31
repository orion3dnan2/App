# دليل ربط التطبيق الجوال بالموقع

## 1. إعداد تطبيق React Native

### إنشاء مشروع جديد

```bash
npx react-native init BaytAlSudaniApp
cd BaytAlSudaniApp
```

### تثبيت المكتبات المطلوبة

```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install axios
npm install react-native-image-picker
npm install react-native-push-notification
```

## 2. إعداد خدمة API في React Native

```typescript
// services/ApiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export class MobileApiService {
  private static baseURL = "https://your-api-domain.com/api";

  static async setToken(token: string) {
    await AsyncStorage.setItem("auth_token", token);
  }

  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("auth_token");
  }

  static async removeToken() {
    await AsyncStorage.removeItem("auth_token");
  }

  private static async getHeaders(includeAuth = true): Promise<HeadersInit> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "X-Platform": "mobile",
    };

    if (includeAuth) {
      const token = await this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  static async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  // نفس الطرق الموجودة في ApiService ولكن معدلة للجوال
  static async login(credentials: any) {
    const response = await this.request("/auth/login", {
      method: "POST",
      headers: await this.getHeaders(false),
      body: JSON.stringify({ ...credentials, platform: "mobile" }),
    });

    if (response.token) {
      await this.setToken(response.token);
    }

    return response;
  }
}
```

## 3. مكونات الواجهة المشتركة

```typescript
// components/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  storeName: string;
}

export const ProductCard: React.FC<{ product: Product; onPress: () => void }> = ({
  product,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.store}>{product.storeName}</Text>
        <Text style={styles.price}>{product.price} ريال</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
  },
  store: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22C55E',
    textAlign: 'right',
    marginTop: 8,
  },
});
```

## 4. شاشات التطبيق الرئيسية

```typescript
// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { MobileApiService } from '../services/ApiService';

export const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, companiesData] = await Promise.all([
        MobileApiService.request('/products?limit=10'),
        MobileApiService.request('/companies?featured=true'),
      ]);

      setProducts(productsData);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>البيت السوداني</Text>
      <Text style={styles.subtitle}>أحدث المنتجات</Text>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onPress={() => {/* Navigate to product details */}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 10,
    textAlign: 'right',
    color: '#666',
  },
});
```

## 5. إعداد التنقل

```typescript
// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { CompaniesScreen } from '../screens/CompaniesScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#22C55E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'البيت السوداني' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'تسجيل الدخول' }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ title: 'المنتجات' }}
        />
        <Stack.Screen
          name="Companies"
          component={CompaniesScreen}
          options={{ title: 'الشركات' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

## 6. مزامنة البيانات

```typescript
// services/SyncService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-netinfo/netinfo";

export class SyncService {
  private static SYNC_KEYS = {
    PRODUCTS: "cached_products",
    COMPANIES: "cached_companies",
    LAST_SYNC: "last_sync",
  };

  static async syncData() {
    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected,
    );

    if (!isConnected) {
      return this.loadCachedData();
    }

    try {
      const [products, companies] = await Promise.all([
        MobileApiService.request("/products"),
        MobileApiService.request("/companies"),
      ]);

      // حفظ البيانات محلياً
      await AsyncStorage.setItem(
        this.SYNC_KEYS.PRODUCTS,
        JSON.stringify(products),
      );
      await AsyncStorage.setItem(
        this.SYNC_KEYS.COMPANIES,
        JSON.stringify(companies),
      );
      await AsyncStorage.setItem(
        this.SYNC_KEYS.LAST_SYNC,
        new Date().toISOString(),
      );

      return { products, companies };
    } catch (error) {
      console.error("Sync failed:", error);
      return this.loadCachedData();
    }
  }

  static async loadCachedData() {
    const [products, companies] = await Promise.all([
      AsyncStorage.getItem(this.SYNC_KEYS.PRODUCTS),
      AsyncStorage.getItem(this.SYNC_KEYS.COMPANIES),
    ]);

    return {
      products: products ? JSON.parse(products) : [],
      companies: companies ? JSON.parse(companies) : [],
    };
  }
}
```

## 7. إعداد الإشعارات

```typescript
// services/NotificationService.ts
import PushNotification from "react-native-push-notification";

export class NotificationService {
  static init() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
        // إرسال الرمز إلى الخادم
        MobileApiService.request("/mobile/register-token", {
          method: "POST",
          body: JSON.stringify({ token: token.token }),
        });
      },

      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // معالجة الإشعار
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  static sendLocalNotification(title: string, message: string) {
    PushNotification.localNotification({
      title,
      message,
    });
  }
}
```

## 8. إعداد المصادقة المشتركة

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MobileApiService } from '../services/ApiService';

const AuthContext = createContext(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await MobileApiService.getToken();
      if (token) {
        const userData = await MobileApiService.request('/auth/me');
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await MobileApiService.removeToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: any) => {
    const response = await MobileApiService.login(credentials);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await MobileApiService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## الخلاصة

هذا الإعداد يوفر:

1. **API موحد** يخدم الويب والجوال
2. **مصادقة مشتركة** مع رموز JWT
3. **مزامنة البيانات** مع التخزين المحلي
4. **مكونات قابلة للإعادة** الاستخدام
5. **إشعارات push** للتطبيق الجوال
6. **دعم وضع عدم الاتصال**

لتطبيق هذا النظام:

1. ابدأ بإعداد API الخلفي
2. أنشئ تطبيق React Native
3. قم بتطبيق خدمات API
4. اختبر المزامنة بين المنصتين
