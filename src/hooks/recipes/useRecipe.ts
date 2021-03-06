import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { IRecipe } from 'backend/models/recipe';

const getRecipe = async (recipeId: string): Promise<IRecipe> => {
  const res = await axios.get<IRecipe>(`/api/recipes/${recipeId}`);
  return res.data;
};

const useRecipe = (recipeId: string): UseQueryResult<IRecipe, AxiosError> =>
  useQuery(['recipes', 'detail', recipeId], () => getRecipe(recipeId));

export default useRecipe;
