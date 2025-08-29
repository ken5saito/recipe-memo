import { useState, useEffect } from "react";
import type { Recipe } from "./types/recipe";
import { RecipeForm } from "./components/RecipeForm";
import { RecipeList } from "./components/RecipeList";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<"list" | "detail" | "edit">("list");
  const RECIPES_PER_PAGE = 5;

  const pagedRecipes = recipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  const LOCAL_STORAGE_KEY = "recipeMemoAppData";

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleAdd = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedId(null);
  };

  const handleDelete = (id: number) => {
    setRecipes((prev) => {
      const updated = prev.filter((recipe) => recipe.id !== id);
      const newTotalPages = Math.max(
        1,
        Math.ceil(updated.length / RECIPES_PER_PAGE)
      );
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
      return updated;
    });
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleEdit = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      setEditingId(id);
      setEditingRecipe(recipe);
    }
  };

  const handleUpdate = (updatedRecipe: Recipe) => {
    setRecipes(
      recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
    setEditingId(null);
    setEditingRecipe(null);
  };

  const selectedRecipe = recipes.find((r) => r.id === selectedId);

  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

  return (
    <div>
      <Header />
      <div className="main-container">
        {view === "list" && (
          <>
            {!editingId && <RecipeForm onAdd={handleAdd} />}
            {editingRecipe && editingId && (
              <RecipeForm
                initialRecipe={editingRecipe}
                onUpdate={handleUpdate}
                onCancel={() => {
                  setEditingId(null);
                  setEditingRecipe(null);
                }}
              />
            )}
            <RecipeList
              recipes={pagedRecipes}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <div
              style={{
                textAlign: "center",
                margin: "16px 0",
                display: totalPages === 0 ? "none" : "block",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                前へ
              </button>
              <span style={{ margin: "0 12px" }}>
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                次へ
              </button>
            </div>
          </>
        )}
        {view === "detail" && selectedRecipe && (
          <div className="selected-recipe">
            <button onClick={handleBackToList}>戻る</button>
            <h2>{selectedRecipe.title}</h2>
            <strong>【材料】</strong>
            <div>{selectedRecipe.ingredients}</div>
            <strong>【手順】</strong>
            <div>{selectedRecipe.instructions}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
