# البيت السوداني - React Native Migration Guide
# Complete Web to Mobile App Conversion

## Overview
This guide provides a complete step-by-step conversion of the البيت السوداني web application to React Native with full Arabic RTL support and native mobile optimization.

## 🚀 Phase 1: Project Setup

### 1.1 Create New React Native Project

```bash
# Install React Native CLI
npm install -g @react-native-community/cli

# Create new project
npx react-native init BaytAlSudaniApp --template react-native-template-typescript

# Navigate to project
cd BaytAlSudaniApp
```

### 1.2 Install Required Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler

# UI Components
npm install react-native-vector-icons react-native-elements
npm install react-native-paper # Material Design components
npm install react-native-super-grid # Grid layouts

# Storage & State Management
npm install @react-native-async-storage/async-storage
npm install @reduxjs/toolkit react-redux # State management

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Network & API
npm install axios react-query

# Utilities
npm install react-native-device-info
npm install react-native-orientation-locker
npm install react-native-splash-screen

# RTL Support
npm install react-native-super-grid
npm install i18n-js

# Image & Media
npm install react-native-image-picker
npm install react-native-fast-image

# Notifications
npm install @react-native-firebase/app @react-native-firebase/messaging

# Date & Time
npm install date-fns

# Icons (iOS additional setup required)
cd ios && pod install && cd ..
```

### 1.3 Android RTL Configuration

**android/app/src/main/AndroidManifest.xml:**
```xml
<application
  android:name=".MainApplication"
  android:label="@string/app_name"
  android:icon="@mipmap/ic_launcher"
  android:allowBackup="false"
  android:theme="@style/AppTheme"
  android:supportsRtl="true">
  <!-- Add this line for RTL support -->
```

## 🏗️ Phase 2: Project Structure

### 2.1 Folder Structure
```
BaytAlSudaniApp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # Basic UI components
│   │   ├── forms/          # Form components
│   │   └── layout/         # Layout components
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── admin/          # Admin dashboard screens
│   │   ├── merchant/       # Merchant dashboard screens
│   │   └── public/         # Public screens
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API services
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   ├── constants/          # Constants and types
│   ├── assets/             # Images, fonts, etc.
│   └── localization/       # Arabic/English translations
├── android/                # Android-specific code
├── ios/                    # iOS-specific code
└── package.json
```

## 📱 Phase 3: Core Components Conversion

### 3.1 Theme Provider (React Native Version)

**src/contexts/ThemeContext.tsx:**
```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { I18nManager } from 'react-native';

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  isRTL: boolean;
  isDark: boolean;
  toggleTheme: () => void;
  setRTL: (rtl: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  const setRTL = (rtl: boolean) => {
    I18nManager.forceRTL(rtl);
    setIsRTL(rtl);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        isRTL,
        isDark: colorScheme === 'dark',
        toggleTheme,
        setRTL,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### 3.2 Colors & Styling System

**src/constants/colors.ts:**
```typescript
export const Colors = {
  // Primary Colors (Sudanese Cultural Colors)
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Secondary Colors (Sudanese Gold)
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Neutral Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Background Colors
  background: {
    light: '#ffffff',
    dark: '#0f172a',
  },

  // Text Colors
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    inverse: '#ffffff',
  },
};

export const createThemedStyles = (isDark: boolean, isRTL: boolean) => ({
  container: {
    flex: 1,
    backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
  },
  text: {
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Regular', // We'll add this font
  },
  rtlRow: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
  rtlText: {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
});
```

## 🔐 Phase 4: Authentication System

### 4.1 Auth Context (Mobile Version)

**src/contexts/AuthContext.tsx:**
```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';
import { AuthService } from '../services/AuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isMerchant: boolean;
  isCustomer: boolean;
  login: (credentials: { username: string; password: string }) => Promise<User>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      await AsyncStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);
      await AsyncStorage.setItem('auth_token', response.token);
      setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshAuth = async () => {
    await initializeAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isSuperAdmin: user?.role === 'super_admin',
        isMerchant: user?.role === 'merchant',
        isCustomer: user?.role === 'customer',
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 4.2 API Service (Mobile Version)

**src/services/ApiService.ts:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ApiService {
  private static baseURL = 'https://your-api-domain.com/api'; // Replace with your API URL

  static async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Platform': 'mobile',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getAuthHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  static async login(credentials: { username: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Marketplace endpoints
  static async getProducts(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/products${query}`);
  }

  static async getCompanies(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/companies${query}`);
  }

  static async getJobs(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/jobs${query}`);
  }

  // Add more endpoints as needed...
}
```

## 🧭 Phase 5: Navigation System

### 5.1 Main Navigation Structure

**src/navigation/AppNavigator.tsx:**
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';

// Import screens
import HomeScreen from '../screens/public/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MarketplaceScreen from '../screens/public/MarketplaceScreen';
import CompaniesScreen from '../screens/public/CompaniesScreen';
import JobsScreen from '../screens/public/JobsScreen';
import ServicesScreen from '../screens/public/ServicesScreen';
import AdminDashboard from '../screens/admin/AdminDashboard';
import MerchantDashboard from '../screens/merchant/MerchantDashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator
function MainTabNavigator() {
  const { isDark, isRTL } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Marketplace':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case 'Companies':
              iconName = focused ? 'business' : 'business-outline';
              break;
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Services':
              iconName = focused ? 'construct' : 'construct-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary[600],
        tabBarInactiveTintColor: Colors.gray[400],
        tabBarStyle: {
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
          borderTopColor: Colors.gray[200],
        },
        tabBarLabelStyle: {
          fontFamily: 'NotoSansArabic-Regular',
          textAlign: isRTL ? 'right' : 'left',
        },
        headerStyle: {
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
        },
        headerTintColor: isDark ? Colors.text.inverse : Colors.text.primary,
        headerTitleStyle: {
          fontFamily: 'NotoSansArabic-Bold',
          textAlign: isRTL ? 'right' : 'center',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'الرئيسية' }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen} 
        options={{ title: 'السوق' }}
      />
      <Tab.Screen 
        name="Companies" 
        component={CompaniesScreen} 
        options={{ title: 'الشركات' }}
      />
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen} 
        options={{ title: 'الوظائف' }}
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen} 
        options={{ title: 'الخدمات' }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isDark, isRTL } = useTheme();

  if (isLoading) {
    return null; // You can add a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
          },
          headerTintColor: isDark ? Colors.text.inverse : Colors.text.primary,
          headerTitleStyle: {
            fontFamily: 'NotoSansArabic-Bold',
            textAlign: isRTL ? 'right' : 'center',
          },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'تسجيل الدخول', headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ title: 'إنشاء حساب' }}
            />
          </>
        ) : (
          // Authenticated Stack
          <>
            {user?.role === 'super_admin' && (
              <Stack.Screen 
                name="AdminDashboard" 
                component={AdminDashboard} 
                options={{ title: 'لوحة الإدارة' }}
              />
            )}
            {user?.role === 'merchant' && (
              <Stack.Screen 
                name="MerchantDashboard" 
                component={MerchantDashboard} 
                options={{ title: 'لوحة التاجر' }}
              />
            )}
            <Stack.Screen 
              name="Main" 
              component={MainTabNavigator} 
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 📱 Phase 6: Screen Components

### 6.1 Home Screen (Mobile Version)

**src/screens/public/HomeScreen.tsx:**
```typescript
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../contexts/ThemeContext';
import { Colors, createThemedStyles } from '../../constants/colors';
import { ApiService } from '../../services/ApiService';

const { width } = Dimensions.get('window');

interface StatItem {
  icon: string;
  number: string;
  label: string;
}

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  route: string;
  color: string;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isDark, isRTL } = useTheme();
  const styles = createStyles(isDark, isRTL);

  const [stats, setStats] = useState<StatItem[]>([
    { icon: 'people', number: '100K+', label: 'مستخدم نشط' },
    { icon: 'business', number: '5K+', label: 'شركة مسجلة' },
    { icon: 'bag', number: '50K+', label: 'منتج متوفر' },
    { icon: 'briefcase', number: '2K+', label: 'فرصة عمل' },
  ]);

  const services: ServiceItem[] = [
    {
      icon: 'storefront',
      title: 'السوق التجاري',
      description: 'اكتشف منتجات سودانية أصيلة من تجار موثوقين',
      route: 'Marketplace',
      color: Colors.primary[600],
    },
    {
      icon: 'business',
      title: 'دليل الشركات',
      description: 'تواصل مع الشركات والمؤسسات السودانية في الخليج',
      route: 'Companies',
      color: Colors.secondary[600],
    },
    {
      icon: 'briefcase',
      title: 'لوحة الوظائف',
      description: 'ابحث عن فرص عمل مناسبة أو أعلن عن وظائف شاغرة',
      route: 'Jobs',
      color: '#8b5cf6',
    },
    {
      icon: 'construct',
      title: 'الخدمات المهنية',
      description: 'احصل على خدمات مهنية متخصصة من خبراء سودانيين',
      route: 'Services',
      color: '#f59e0b',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <ImageBackground
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets%2Fb1a0c751ea8f428fb17cf787dc4c95b1%2Fada8ce46064846e687a3341dd0ab9c15?format=webp&width=1200'
          }}
          style={styles.heroSection}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>البيت السوداني</Text>
              <Text style={styles.heroSubtitle}>
                سوق وخدمات وشركات السودان في الخليج والعالم
              </Text>
              
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate('Marketplace')}
                >
                  <Text style={styles.primaryButtonText}>استكشف السوق</Text>
                  <Icon 
                    name={isRTL ? 'chevron-back' : 'chevron-forward'} 
                    size={20} 
                    color="white" 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.secondaryButtonText}>انضم إلينا</Text>
                </TouchableOpacity>
              </View>

              {/* Stats */}
              <View style={styles.statsContainer}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statItem}>
                    <View style={styles.statIcon}>
                      <Icon name={stat.icon} size={24} color="white" />
                    </View>
                    <Text style={styles.statNumber}>{stat.number}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>خدماتنا</Text>
          <Text style={styles.sectionSubtitle}>
            مجموعة شاملة من الخدمات المصممة خصيصاً للمجتمع السوداني
          </Text>

          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() => navigation.navigate(service.route)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                  <Icon name={service.icon} size={28} color={service.color} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.serviceArrow}>
                  <Icon 
                    name={isRTL ? 'chevron-back' : 'chevron-forward'} 
                    size={16} 
                    color={Colors.gray[400]} 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean, isRTL: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
  },
  heroSection: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'NotoSansArabic-Bold',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'NotoSansArabic-Regular',
    lineHeight: 22,
  },
  ctaButtons: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  statsContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: width / 4 - 20,
  },
  statIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'NotoSansArabic-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: 'NotoSansArabic-Regular',
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: isRTL ? 'right' : 'center',
    marginBottom: 8,
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: isRTL ? 'right' : 'center',
    marginBottom: 24,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
    lineHeight: 22,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: isDark ? Colors.gray[800] : 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: isRTL ? 'flex-end' : 'flex-start',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: isRTL ? 'right' : 'left',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    lineHeight: 20,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Regular',
  },
  serviceArrow: {
    position: 'absolute',
    top: 20,
    [isRTL ? 'left' : 'right']: 20,
  },
});
```

This is just the beginning of the comprehensive guide. Would you like me to continue with the remaining components, including the Login screen, Marketplace, and all other screens, along with the complete UI component library and setup instructions?