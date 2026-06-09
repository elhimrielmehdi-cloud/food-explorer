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

export const api = {
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  },

  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  },

  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
  },

  getMealDetails: async (id: string): Promise<MealDetail | null> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  },
};
