// Admin Dashboard Screen
// src/screens/admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/colors';
import Card from '../../components/ui/Card';
import { ApiService } from '../../services/ApiService';

const { width } = Dimensions.get('window');

interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalProducts: number;
  totalOrders: number;
  monthlyRevenue: number;
  activeUsers: number;
}

interface AdminAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

export default function AdminDashboard() {
  const navigation = useNavigation();
  const { isDark, isRTL } = useTheme();
  const styles = createStyles(isDark, isRTL);

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStores: 0,
    totalProducts: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const adminActions: AdminAction[] = [
    {
      id: '1',
      title: 'إدارة المستخدمين',
      description: 'عرض وإدارة جميع المستخدمين',
      icon: 'people',
      color: Colors.primary[600],
      route: 'AdminUsers',
    },
    {
      id: '2',
      title: 'إدارة المتاجر',
      description: 'مراجعة وإدارة المتاجر',
      icon: 'storefront',
      color: Colors.secondary[600],
      route: 'AdminStores',
    },
    {
      id: '3',
      title: 'المحتوى والصفحات',
      description: 'إدارة محتوى التطبيق',
      icon: 'document-text',
      color: '#8b5cf6',
      route: 'AdminContent',
    },
    {
      id: '4',
      title: 'الإعدادات العامة',
      description: 'إعدادات النظام والتطبيق',
      icon: 'settings',
      color: '#f59e0b',
      route: 'AdminSettings',
    },
    {
      id: '5',
      title: 'التقارير والإحصائيات',
      description: 'عرض التقارير المفصلة',
      icon: 'bar-chart',
      color: '#10b981',
      route: 'AdminReports',
    },
    {
      id: '6',
      title: 'النشاط والسجلات',
      description: 'مراقبة نشاط النظام',
      icon: 'time',
      color: '#ef4444',
      route: 'AdminActivity',
    },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await ApiService.request('/admin/dashboard/stats');
      setStats(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStatCard = (title: string, value: number, icon: string, color: string) => (
    <Card style={[styles.statCard, { width: (width - 48) / 2 }]}>
      <View style={styles.statContent}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Icon name={icon} size={24} color={color} />
        </View>
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value.toLocaleString()}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
    </Card>
  );

  const renderActionCard = (action: AdminAction) => (
    <TouchableOpacity
      key={action.id}
      style={styles.actionCard}
      onPress={() => navigation.navigate(action.route)}
    >
      <Card style={styles.actionCardContent}>
        <View style={styles.actionHeader}>
          <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
            <Icon name={action.icon} size={28} color={action.color} />
          </View>
          <Icon 
            name={isRTL ? 'chevron-back' : 'chevron-forward'} 
            size={20} 
            color={Colors.gray[400]} 
          />
        </View>
        <Text style={styles.actionTitle}>{action.title}</Text>
        <Text style={styles.actionDescription}>{action.description}</Text>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>جاري تحميل لوحة الإدارة...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>مرحباً بك في لوحة الإدارة</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('ar-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>الإحصائيات العامة</Text>
          <View style={styles.statsGrid}>
            {renderStatCard('المستخدمين', stats.totalUsers, 'people', Colors.primary[600])}
            {renderStatCard('المتاجر', stats.totalStores, 'storefront', Colors.secondary[600])}
            {renderStatCard('المنتجات', stats.totalProducts, 'bag', '#8b5cf6')}
            {renderStatCard('الطلبات', stats.totalOrders, 'receipt', '#f59e0b')}
          </View>
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueSection}>
          <Card style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <View>
                <Text style={styles.revenueTitle}>الإيرادات الشهرية</Text>
                <Text style={styles.revenueValue}>
                  {stats.monthlyRevenue.toLocaleString()} ريال
                </Text>
              </View>
              <View style={styles.revenueIcon}>
                <Icon name="trending-up" size={32} color={Colors.success} />
              </View>
            </View>
            <Text style={styles.revenueSubtext}>
              +12% مقارنة بالشهر الماضي
            </Text>
          </Card>
        </View>

        {/* Admin Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>إجراءات الإدارة</Text>
          <View style={styles.actionsGrid}>
            {adminActions.map(renderActionCard)}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStatsSection}>
          <Text style={styles.sectionTitle}>إحصائيات سريعة</Text>
          <Card style={styles.quickStatsCard}>
            <View style={styles.quickStatItem}>
              <Icon name="pulse" size={20} color={Colors.success} />
              <Text style={styles.quickStatText}>
                {stats.activeUsers} مستخدم نشط الآن
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean, isRTL: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? Colors.background.dark : Colors.gray[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Bold',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Regular',
  },
  statsSection: {
    padding: 20,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    marginBottom: 12,
  },
  statContent: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    flex: 1,
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
  },
  statTitle: {
    fontSize: 14,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
  },
  revenueSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  revenueCard: {
    padding: 20,
  },
  revenueHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  revenueTitle: {
    fontSize: 16,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
    textAlign: isRTL ? 'right' : 'left',
  },
  revenueIcon: {
    width: 56,
    height: 56,
    backgroundColor: Colors.success + '20',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueSubtext: {
    fontSize: 14,
    color: Colors.success,
    fontFamily: 'NotoSansArabic-Regular',
    textAlign: isRTL ? 'right' : 'left',
  },
  actionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  actionsGrid: {
    gap: 12,
  },
  actionCard: {
    marginBottom: 8,
  },
  actionCardContent: {
    padding: 16,
  },
  actionHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Bold',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Regular',
  },
  quickStatsSection: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  quickStatsCard: {
    padding: 16,
  },
  quickStatItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickStatText: {
    fontSize: 16,
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Regular',
  },
});

// Merchant Dashboard Screen
// src/screens/merchant/MerchantDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ApiService } from '../../services/ApiService';

const { width } = Dimensions.get('window');

interface MerchantStats {
  totalProducts: number;
  totalOrders: number;
  monthlyRevenue: number;
  totalViews: number;
  pendingOrders: number;
  lowStockProducts: number;
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: string;
}

export default function MerchantDashboard() {
  const navigation = useNavigation();
  const { isDark, isRTL } = useTheme();
  const styles = createMerchantStyles(isDark, isRTL);

  const [stats, setStats] = useState<MerchantStats>({
    totalProducts: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    totalViews: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'إضافة منتج',
      icon: 'add-circle',
      color: Colors.primary[600],
      route: 'NewProduct',
    },
    {
      id: '2',
      title: 'الطلبات',
      icon: 'receipt',
      color: Colors.secondary[600],
      route: 'MerchantOrders',
    },
    {
      id: '3',
      title: 'المنتجات',
      icon: 'bag',
      color: '#8b5cf6',
      route: 'MerchantProducts',
    },
    {
      id: '4',
      title: 'التحليلات',
      icon: 'bar-chart',
      color: '#10b981',
      route: 'MerchantAnalytics',
    },
  ];

  useEffect(() => {
    loadMerchantData();
  }, []);

  const loadMerchantData = async () => {
    try {
      setLoading(true);
      const data = await ApiService.request('/merchant/dashboard/stats');
      setStats(data);
    } catch (error) {
      console.error('Error loading merchant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStatCard = (title: string, value: number, icon: string, color: string) => (
    <Card style={[styles.statCard, { width: (width - 48) / 2 }]}>
      <View style={styles.statContent}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Icon name={icon} size={20} color={color} />
        </View>
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value.toLocaleString()}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
    </Card>
  );

  const renderQuickAction = (action: QuickAction) => (
    <TouchableOpacity
      key={action.id}
      style={[styles.quickActionCard, { width: (width - 60) / 2 }]}
      onPress={() => navigation.navigate(action.route)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
        <Icon name={action.icon} size={24} color="white" />
      </View>
      <Text style={styles.quickActionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>جاري تحميل لوحة التاجر...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>مرحباً بك في متجرك</Text>
          <Button
            title="إضافة منتج جديد"
            onPress={() => navigation.navigate('NewProduct')}
            size="sm"
            icon={<Icon name="add" size={16} color="white" />}
          />
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>إحصائيات المتجر</Text>
          <View style={styles.statsGrid}>
            {renderStatCard('المنتجات', stats.totalProducts, 'bag', Colors.primary[600])}
            {renderStatCard('الطلبات', stats.totalOrders, 'receipt', Colors.secondary[600])}
            {renderStatCard('المشاهدات', stats.totalViews, 'eye', '#8b5cf6')}
            {renderStatCard('الإيرادات', stats.monthlyRevenue, 'trending-up', '#10b981')}
          </View>
        </View>

        {/* Alerts */}
        {(stats.pendingOrders > 0 || stats.lowStockProducts > 0) && (
          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>تنبيهات مهمة</Text>
            
            {stats.pendingOrders > 0 && (
              <Card style={styles.alertCard}>
                <View style={styles.alertContent}>
                  <View style={styles.alertIcon}>
                    <Icon name="time" size={24} color={Colors.warning} />
                  </View>
                  <View style={styles.alertText}>
                    <Text style={styles.alertTitle}>طلبات معلقة</Text>
                    <Text style={styles.alertDescription}>
                      لديك {stats.pendingOrders} طلب في انتظار المراجعة
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.alertAction}
                    onPress={() => navigation.navigate('MerchantOrders')}
                  >
                    <Icon name="chevron-forward" size={20} color={Colors.gray[400]} />
                  </TouchableOpacity>
                </View>
              </Card>
            )}

            {stats.lowStockProducts > 0 && (
              <Card style={styles.alertCard}>
                <View style={styles.alertContent}>
                  <View style={styles.alertIcon}>
                    <Icon name="warning" size={24} color={Colors.error} />
                  </View>
                  <View style={styles.alertText}>
                    <Text style={styles.alertTitle}>مخزون منخفض</Text>
                    <Text style={styles.alertDescription}>
                      {stats.lowStockProducts} منتج يحتاج إعادة تخزين
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.alertAction}
                    onPress={() => navigation.navigate('MerchantProducts', { filter: 'lowStock' })}
                  >
                    <Icon name="chevron-forward" size={20} color={Colors.gray[400]} />
                  </TouchableOpacity>
                </View>
              </Card>
            )}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>النشاط الأخير</Text>
          <Card style={styles.activityCard}>
            <Text style={styles.activityPlaceholder}>
              لا يوجد نشاط حديث
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createMerchantStyles = (isDark: boolean, isRTL: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? Colors.background.dark : Colors.gray[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
  },
  header: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
  },
  statsSection: {
    padding: 20,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    marginBottom: 12,
    padding: 16,
  },
  statContent: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    flex: 1,
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
  },
  statTitle: {
    fontSize: 12,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
  },
  alertsSection: {
    padding: 20,
    paddingTop: 0,
  },
  alertCard: {
    marginBottom: 12,
    padding: 16,
  },
  alertContent: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    flex: 1,
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Bold',
    textAlign: isRTL ? 'right' : 'left',
  },
  alertDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    fontFamily: 'NotoSansArabic-Regular',
    textAlign: isRTL ? 'right' : 'left',
  },
  alertAction: {
    padding: 4,
  },
  quickActionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsGrid: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: isDark ? Colors.gray[800] : 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-SemiBold',
    textAlign: 'center',
  },
  activitySection: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  activityCard: {
    padding: 20,
  },
  activityPlaceholder: {
    fontSize: 16,
    color: Colors.gray[500],
    textAlign: 'center',
    fontFamily: 'NotoSansArabic-Regular',
  },
});