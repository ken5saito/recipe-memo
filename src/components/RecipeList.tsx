import type { Recipe } from "../types/recipe";
import "../styles/RecipeList.css";

interface Props {
  recipes: Recipe[];
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const RecipeList = ({ recipes, onSelect, onDelete, onEdit }: Props) => (
  <ul className="recipe-list">
    {recipes.map((recipe) => (
      <li key={recipe.id} className="recipe-list-item">
        <span onClick={() => onSelect(recipe.id)} className="recipe-title">
          {recipe.title}
        </span>
        <div>
          <button onClick={() => onDelete(recipe.id)} className="delete-button">
            削除
          </button>
          <button onClick={() => onEdit(recipe.id)} className="edit-button">
            編集
          </button>
        </div>
      </li>
    ))}
  </ul>
);
