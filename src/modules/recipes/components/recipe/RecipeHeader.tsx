import { ReactElement } from 'react';
import Image from 'next/image';

import { IRecipe } from '@/backend/models/recipe';

type IRecipeHeader = Pick<IRecipe, 'image' | 'name'>;

const RecipeHeader = ({ image, name }: IRecipeHeader): ReactElement => (
  <div className="space-y-4">
    <div className="relative overflow-hidden rounded-md shadow-md">
      <div className="relative aspect-square">
        <Image
          alt="Picture of the dish"
          layout="fill"
          objectFit="cover"
          priority
          src={image || '/image-placeholder.png'}
        />
      </div>
    </div>
    <h1 className="px-4 text-2xl font-bold text-center">{name}</h1>
  </div>
);

export default RecipeHeader;
