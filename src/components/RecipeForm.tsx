import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";

interface Props {
  onAdd?: (recipe: Recipe) => void;
  onUpdate?: (recipe: Recipe) => void;
  onCancel?: () => void;
  initialRecipe?: Recipe | null;
}

export const RecipeForm = ({
  onAdd,
  onUpdate,
  onCancel,
  initialRecipe = null,
}: Props) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  //レシピの新規追加と更新の制御
  useEffect(() => {
    if (initialRecipe) {
      setTitle(initialRecipe.title);
      setIngredients(initialRecipe.ingredients);
      setInstructions(initialRecipe.instructions);
    } else {
      setTitle("");
      setIngredients("");
      setInstructions("");
    }
  }, [initialRecipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; //レシピ名のバリデーション
    const recipe: Recipe = {
      id: initialRecipe ? initialRecipe.id : Date.now(),
      title,
      ingredients,
      instructions,
    };
    if (initialRecipe && onUpdate) {
      onUpdate(recipe);
    } else if (onAdd) {
      onAdd(recipe);
      setTitle("");
      setIngredients("");
      setInstructions("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="レシピ名"
        required
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="材料"
      />
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="手順"
      />
      <button type="submit">{initialRecipe ? "更新" : "追加"}</button>
      {initialRecipe && onCancel && (
        <button className="cancel-button" type="button" onClick={onCancel}>
          キャンセル
        </button>
      )}
    </form>
  );
};
