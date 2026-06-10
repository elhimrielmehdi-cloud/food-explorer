import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { api, Category } from "../services/api";
import { Colors } from "../constants/theme";
import { useColorScheme } from "react-native";

export default function ExploreScreen() {
  const scheme = useColorScheme() || 'light';
  const colors = Colors[scheme];
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={[styles.card, { backgroundColor: scheme === 'dark' ? '#333' : '#fff' }]}>
      <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>{item.strCategory}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
          {item.strCategoryDescription}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Explore Categories</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover recipes by food category
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
