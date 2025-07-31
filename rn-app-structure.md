# React Native البيت السوداني - Complete App Structure

## Phase 7: Login Screen (Mobile Optimized)

**src/screens/auth/LoginScreen.tsx:**
```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/colors';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { isDark, isRTL } = useTheme();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    try {
      setIsLoading(true);
      const user = await login(formData);
      
      // Navigation will be handled by the AuthContext
      console.log('Login successful:', user);
    } catch (error) {
      Alert.alert('خطأ في تسجيل الدخول', error.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = createStyles(isDark, isRTL);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon name="log-in" size={40} color={Colors.primary[600]} />
            </View>
            <Text style={styles.title}>تسجيل الدخول</Text>
            <Text style={styles.subtitle}>أدخل بيانات تسجيل دخولك</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>👤 اسم المستخدم</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="أدخل اسم المستخدم"
                  placeholderTextColor={Colors.gray[400]}
                  value={formData.username}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
                  textAlign={isRTL ? 'right' : 'left'}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>🔐 كلمة المرور</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: isRTL ? 50 : 20, paddingLeft: isRTL ? 20 : 50 }]}
                  placeholder="أدخل كلمة المرور"
                  placeholderTextColor={Colors.gray[400]}
                  value={formData.password}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                  secureTextEntry={!showPassword}
                  textAlign={isRTL ? 'right' : 'left'}
                />
                <TouchableOpacity
                  style={[styles.eyeButton, { [isRTL ? 'left' : 'right']: 15 }]}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color={Colors.gray[400]} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
                  <Icon 
                    name={isRTL ? 'chevron-back' : 'chevron-forward'} 
                    size={20} 
                    color="white" 
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>
                ليس لديك حساب؟ <Text style={styles.registerLinkText}>انشئ حساب جديد</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Demo Accounts */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>حسابات التجربة</Text>
            
            <View style={styles.demoCard}>
              <Text style={styles.demoRole}>مدير التطبيق (Super Admin)</Text>
              <Text style={styles.demoCredentials}>admin / admin</Text>
            </View>
            
            <View style={styles.demoCard}>
              <Text style={styles.demoRole}>صاحب متجر (Merchant)</Text>
              <Text style={styles.demoCredentials}>merchant / merchant</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean, isRTL: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primary[50],
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    marginBottom: 8,
    fontFamily: 'NotoSansArabic-Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    marginBottom: 8,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: isDark ? Colors.gray[800] : Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Regular',
  },
  eyeButton: {
    position: 'absolute',
    top: 18,
    padding: 4,
  },
  loginButton: {
    backgroundColor: Colors.primary[600],
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  registerLink: {
    marginTop: 24,
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 16,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
    textAlign: 'center',
  },
  registerLinkText: {
    color: Colors.primary[600],
    fontWeight: '600',
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  demoSection: {
    backgroundColor: isDark ? Colors.gray[800] : Colors.primary[50],
    borderRadius: 16,
    padding: 20,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary[700],
    textAlign: isRTL ? 'right' : 'center',
    marginBottom: 16,
    fontFamily: 'NotoSansArabic-Bold',
  },
  demoCard: {
    backgroundColor: isDark ? Colors.gray[700] : 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  demoRole: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 4,
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  demoCredentials: {
    fontSize: 14,
    color: Colors.gray[600],
    fontFamily: 'monospace',
    textAlign: isRTL ? 'right' : 'left',
  },
});
```

## Phase 8: UI Components Library

**src/components/ui/Button.tsx:**
```typescript
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const { isDark, isRTL } = useTheme();
  const styles = createStyles(isDark, isRTL);

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outline':
        baseStyle.push(styles.outline);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostText);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : Colors.primary[600]} 
          size="small" 
        />
      ) : (
        <>
          {icon && !isRTL && icon}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          {icon && isRTL && icon}
        </>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (isDark: boolean, isRTL: boolean) => StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary[600],
  },
  secondary: {
    backgroundColor: Colors.secondary[600],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: Colors.gray[300],
  },

  // Text styles
  text: {
    fontFamily: 'NotoSansArabic-SemiBold',
    textAlign: 'center',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: Colors.primary[600],
  },
  ghostText: {
    color: Colors.primary[600],
  },
  disabledText: {
    color: Colors.gray[500],
  },
});
```

**src/components/ui/Card.tsx:**
```typescript
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
  shadow?: boolean;
}

export default function Card({ 
  children, 
  style, 
  padding = 16, 
  margin = 0,
  shadow = true 
}: CardProps) {
  const { isDark } = useTheme();
  const styles = createStyles(isDark, shadow);

  return (
    <View style={[
      styles.card, 
      { padding, margin },
      style
    ]}>
      {children}
    </View>
  );
}

const createStyles = (isDark: boolean, shadow: boolean) => StyleSheet.create({
  card: {
    backgroundColor: isDark ? Colors.gray[800] : 'white',
    borderRadius: 16,
    borderWidth: isDark ? 1 : 0,
    borderColor: Colors.gray[700],
    ...(shadow && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
});
```