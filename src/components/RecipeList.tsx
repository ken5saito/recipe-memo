import type { Recipe } from '../types/recipe';

interface Props {
    recipes: Recipe[];
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
}

export const RecipeList = ({ recipes, onSelect, onDelete }: Props) => (
    <ul>
        {recipes.map((recipe) => (
            <li key={recipe.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#ecf0f1',
                padding: '0.8rem',
                marginBottom: '0.5rem',
                borderRadius: '4px'
            }}>
                <span onClick={() => onSelect(recipe.id)} style={{ cursor: 'pointer' }}>
                    {recipe.title}
                </span>
                <div>
                    <button onClick={() => onDelete(recipe.id)} style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.4rem 0.8rem',
                        cursor: 'pointer',
                        marginLeft: "10px",
                    }}>
                        削除
                    </button>
                </div>

            </li>
        ))}
    </ul>
);
