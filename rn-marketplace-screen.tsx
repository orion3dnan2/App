// src/screens/public/MarketplaceScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/colors';
import { ApiService } from '../../services/ApiService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 2 columns with padding

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  storeName: string;
}

export default function MarketplaceScreen() {
  const navigation = useNavigation();
  const { isDark, isRTL } = useTheme();
  const styles = createStyles(isDark, isRTL);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'الكل', icon: 'grid' },
    { id: 'food', name: 'طعام', icon: 'fast-food' },
    { id: 'clothing', name: 'ملابس', icon: 'shirt' },
    { id: 'electronics', name: 'إلكترونيات', icon: 'phone-portrait' },
    { id: 'home', name: 'منزل', icon: 'home' },
    { id: 'beauty', name: 'جمال', icon: 'flower' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.storeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Card style={styles.card}>
        <Image 
          source={{ uri: item.images[0] || 'https://via.placeholder.com/200' }}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {item.salePrice && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>خصم</Text>
          </View>
        )}

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          
          <Text style={styles.storeName} numberOfLines={1}>
            {item.storeName}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              {item.salePrice || item.price} ريال
            </Text>
            {item.salePrice && (
              <Text style={styles.originalPrice}>
                {item.price} ريال
              </Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={16} 
        color={selectedCategory === item.id ? 'white' : Colors.primary[600]} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={Colors.gray[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن المنتجات..."
          placeholderTextColor={Colors.gray[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesContent}
      />

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredProducts.length} منتج متوفر
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>جاري تحميل المنتجات...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
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
    padding: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: isDark ? Colors.gray[800] : 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    fontFamily: 'NotoSansArabic-Regular',
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: isRTL ? 0 : 4,
  },
  categoryChip: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: isDark ? Colors.gray[800] : 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    gap: 6,
  },
  selectedCategory: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  categoryText: {
    fontSize: 14,
    color: Colors.primary[600],
    fontFamily: 'NotoSansArabic-SemiBold',
  },
  selectedCategoryText: {
    color: 'white',
  },
  resultsCount: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'NotoSansArabic-Regular',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    width: itemWidth,
    marginBottom: 16,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    [isRTL ? 'left' : 'right']: 8,
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  saleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'NotoSansArabic-Bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? Colors.text.inverse : Colors.text.primary,
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 4,
    fontFamily: 'NotoSansArabic-SemiBold',
    lineHeight: 18,
  },
  storeName: {
    fontSize: 12,
    color: Colors.gray[500],
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 8,
    fontFamily: 'NotoSansArabic-Regular',
  },
  priceContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary[600],
    fontFamily: 'NotoSansArabic-Bold',
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.gray[400],
    textDecorationLine: 'line-through',
    fontFamily: 'NotoSansArabic-Regular',
  },
});