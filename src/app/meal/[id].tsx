import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api, MealDetail } from "@/services/api";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scheme = useColorScheme() || 'light';
  const colors = Colors[scheme];

  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMealDetails();
    }
  }, [id]);

  const loadMealDetails = async () => {
    try {
      const details = await api.getMealDetails(id as string);
      setMeal(details);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Meal not found</Text>
      </View>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>{meal.strMeal}</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{meal.strCategory}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
                <Text style={[styles.badgeText, { color: '#2E7D32' }]}>{meal.strArea}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bullet} />
                  <Text style={[styles.ingredientText, { color: colors.textSecondary }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Instructions</Text>
            <Text style={[styles.instructions, { color: colors.textSecondary }]}>
              {meal.strInstructions}
            </Text>
          </View>

          {meal.strYoutube ? (
            <TouchableOpacity
              style={styles.youtubeButton}
              onPress={() => Linking.openURL(meal.strYoutube)}
            >
              <Text style={styles.youtubeButtonText}>Watch on YouTube</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: "row",
  },
  badge: {
    backgroundColor: "#FFF0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 10,
  },
  badgeText: {
    color: "#FF6B6B",
    fontSize: 12,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  ingredientsList: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B6B",
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
    lineHeight: 20,
  },
  instructions: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
  youtubeButton: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  youtubeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
