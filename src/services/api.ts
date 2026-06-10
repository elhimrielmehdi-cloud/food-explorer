const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends Meal {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strYoutube: string;
  [key: string]: any;
}

const darijaTranslations: Record<string, string> = {
  "Chicken Couscous": "Couscous b Djaj",
  "Lamb Tagine": "Tajine d Lhem",
  "Lamb tomato and sweet spices": "Mrouzia",
  "Moroccan Carrot Soup": "Shorba d Khizou",
  "Spicy North African Potato Salad": "Shlada d Batata Harra",
  "Tahini Lentils": "Ads b Tahini",
  "Beef and Mustard Pie": "Kefta b Lmoutard",
  "Chicken and Mushroom Pie": "Djaj b Lfeggia",
  "Beef and Oyster Pie": "Kefta b Lmhar",
  "Fish Pie": "Pastilla d Lhout",
  "Chicken Handi": "Djaj f Lgamila",
  "Beef Lo Mein": "Nouilles b Lkefta",
  "Lamb Biryani": "Biryani d Lhem",
};

const translateToDarija = (meal: any) => {
  if (meal && meal.strMeal && darijaTranslations[meal.strMeal]) {
    return { ...meal, strMeal: darijaTranslations[meal.strMeal] };
  }
  return meal;
};

export const api = {
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  },

  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    const meals = data.meals || [];
    return meals.map(translateToDarija);
  },

  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    const meals = data.meals || [];
    return meals.map(translateToDarija);
  },

  getMealDetails: async (id: string): Promise<MealDetail | null> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    if (data.meals) {
      return translateToDarija(data.meals[0]);
    }
    return null;
  },
};
