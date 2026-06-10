import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { api, Category, Meal } from "../services/api";
import { Colors } from "../constants/theme";
import { useColorScheme } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme() || 'light';
  const colors = Colors[scheme];
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const cats = await api.getCategories();
      setCategories(cats);
      const initialMeals = await api.getMealsByCategory("Beef");
      setMeals(initialMeals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const categoryMeals = await api.getMealsByCategory(category);
      setMeals(categoryMeals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      setLoading(true);
      try {
        const results = await api.searchMeals(text);
        setMeals(results);
        setSelectedCategory("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else if (text.length === 0) {
      handleCategoryPress("Beef");
    }
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.strCategory && styles.selectedCategoryCard,
      ]}
      onPress={() => handleCategoryPress(item.strCategory)}
    >
      <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryIcon} />
      <Text
        style={[
          styles.categoryLabel,
          selectedCategory === item.strCategory && styles.selectedCategoryLabel,
        ]}
      >
        {item.strCategory}
      </Text>
    </TouchableOpacity>
  );

  const renderMealItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={() => router.push(`/meal/${item.idMeal}`)}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
        <Text style={styles.mealTitle} numberOfLines={1}>
          {item.strMeal}
        </Text>
        <Text style={styles.mealSubtitle}>View Recipe</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Hello, Foodie!</Text>
            <Text style={[styles.title, { color: colors.text }]}>What to cook today?</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/explore')}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: scheme === 'dark' ? '#333' : '#f0f0f0', color: colors.text }]}
          placeholder="Search recipes..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.idCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={[styles.section, { flex: 1 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {searchQuery ? "Search Results" : `${selectedCategory} Recipes`}
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={meals}
            renderItem={renderMealItem}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mealsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoriesList: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 15,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    width: 100,
  },
  selectedCategoryCard: {
    backgroundColor: "#FF6B6B",
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  selectedCategoryLabel: {
    color: "#fff",
  },
  mealsList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  mealCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mealImage: {
    width: "100%",
    height: 150,
  },
  mealInfo: {
    padding: 12,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  mealSubtitle: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 4,
    fontWeight: "600",
  },
});
