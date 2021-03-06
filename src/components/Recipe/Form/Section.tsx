import { ReactElement } from 'react';

interface IRecipeSection {
  children: React.ReactNode;
  label?: string;
}

function RecipeFormSection({ children, label }: IRecipeSection): ReactElement {
  return (
    <div className="space-y-4 w-full">
      {label && (
        <h2 className="ml-4 text-2xl font-medium capitalize">{label}</h2>
      )}
      {children}
    </div>
  );
}

export default RecipeFormSection;
