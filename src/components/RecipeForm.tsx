import { useState } from "react";
import type { Recipe } from "../types/recipe";

interface Props {
  onAdd: (recipe: Recipe) => void;
}

export const RecipeForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; //レシピ名のバリデーション
    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      ingredients,
      instructions,
    };
    onAdd(newRecipe);
    setTitle("");
    setIngredients("");
    setInstructions("");
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
      <button type="submit">追加</button>
    </form>
  );
};
