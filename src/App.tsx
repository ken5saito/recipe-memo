import { useState, useEffect } from 'react';
import type { Recipe } from './types/recipe';
import { RecipeForm } from './components/RecipeForm';
import { RecipeList } from './components/RecipeList';
import './App.css';
import { Header } from './components/Header';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const LOCAL_STORAGE_KEY = 'recipeMemoAppData';

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
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };



  const selectedRecipe = recipes.find((r) => r.id === selectedId);

  return (
    <div>
      <Header />
      <div style={{ padding: '2em' }}>
        <RecipeForm onAdd={handleAdd} />
        <RecipeList recipes={recipes} onSelect={handleSelect} onDelete={handleDelete} />
        {selectedRecipe && (
          <div>
            <h2>{selectedRecipe.title}</h2>
            <strong>【材料】</strong>
            <div style={{ whiteSpace: 'pre-wrap', padding: '8px', marginBottom: "20px" }}>{selectedRecipe.ingredients}</div>
            <strong>【手順】</strong>
            <div style={{ whiteSpace: 'pre-wrap', padding: '8px' }}>{selectedRecipe.instructions}</div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;