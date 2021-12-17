import { FormProvider, useForm } from 'react-hook-form';
import { MdOutlineSave } from 'react-icons/md';
import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { IRecipe } from '@/backend/models/recipe';
import Button from '@/components/UI/Button';
import Loader from '@/components/UI/Loader';
import RecipeFormDetails from '@/components/Recipe/Form/Details';
import RecipeFormImage from '@/components/Recipe/Form/Image';
import RecipeFormIngredients from '@/components/Recipe/Form/Ingredients';
import RecipeFormSteps from '@/components/Recipe/Form/Steps';
import useRecipeCreate from '@/hooks/recipes/useRecipeCreate';
import useRecipeImageUpdate from '@/hooks/recipes/useRecipeImageUpdate';

interface ISelectedImage {
  image?: File;
  url?: string;
}

const RecipeCreatePage = (): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<ISelectedImage>({
    image: undefined,
    url: undefined,
  });

  const { push } = useRouter();

  const { mutateAsync: createRecipe, status: statusRecipeCreate } =
    useRecipeCreate();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate();

  const methods = useForm<IRecipe>();
  const { handleSubmit } = methods;

  const handleCancel = async (): Promise<void> => {
    await push('/profile/my-recipes');
  };

  const handleRecipeCreate = async (data: IRecipe): Promise<void> => {
    const createdRecipe = await createRecipe(data);

    if (selectedImage.image) {
      const updatedImageFormData = new FormData();
      updatedImageFormData.append('_id', createdRecipe._id);
      updatedImageFormData.append('image', selectedImage.image);

      await updateRecipeImage(updatedImageFormData);
    }

    await push(`/recipes/${createdRecipe._id}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="relative space-y-8"
        onSubmit={handleSubmit(handleRecipeCreate)}
      >
        <RecipeFormImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <RecipeFormDetails />

        <RecipeFormIngredients />

        <RecipeFormSteps />

        <div className="flex justify-between">
          <Button onClick={handleCancel}>Anuluj</Button>
          <Button htmlType="submit" type="primary">
            <div className="flex items-center gap-2">
              <span className="font-medium">Utwórz</span>
              {statusRecipeCreate === 'loading' ||
              statusRecipeCreate === 'success' ||
              statusRecipeImageUpdate === 'loading' ||
              statusRecipeImageUpdate === 'success' ? (
                <Loader color="#F59E0B" className="w-6 h-6" />
              ) : (
                <MdOutlineSave />
              )}
            </div>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

RecipeCreatePage.protect = true;

export default RecipeCreatePage;
