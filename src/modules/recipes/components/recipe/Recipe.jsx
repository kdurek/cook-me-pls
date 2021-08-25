import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import RecipeAuthor from '@/modules/recipes/components/recipe/RecipeAuthor';
import RecipeHeader from '@/modules/recipes/components/recipe/RecipeHeader';
import RecipeInfo from '@/modules/recipes/components/recipe/RecipeInfo';
import RecipeIngredients from '@/modules/recipes/components/recipe/RecipeIngredients';
import RecipeSteps from '@/modules/recipes/components/recipe/RecipeSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';

const Recipe = () => {
  const {
    query: { recipeId },
  } = useRouter();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <RecipeHeader imageUrl={recipe.imageUrl} name={recipe.name} />

      <div className="grid grid-flow-col gap-4">
        <RecipeInfo icon="schedule">{recipe.cookTime}</RecipeInfo>
        <RecipeInfo icon="people">1 porcja</RecipeInfo>
        <RecipeInfo icon="bar_chart">{recipe.difficulty}</RecipeInfo>
      </div>

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipeSteps steps={recipe.steps} />

      <RecipeAuthor image={recipe.author.image} name={recipe.author.name} />
    </div>
  );
};

export default Recipe;
