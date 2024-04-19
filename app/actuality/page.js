'use client'
import { useState } from 'react';

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleGenerateArticle() {
        setIsLoading(true);
        try {
            // Vous pouvez ajouter un categoryId par exemple en dur ici ou récupérer cette valeur d'une autre manière
            const categoryId = 1; 
            const response = await fetch('/api/generate-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryId }),
            });
            const article = await response.json();
            alert(`Article Generated: ${article.title}`);
        } catch (error) {
            console.error('Error generating article:', error);
            alert('Failed to generate article');
        }
        setIsLoading(false);
    }

    return (
        <div className="w-full pt-[90px] h-[600px] bg-slate-200">
            <button 
                className={`bg-blue-500 p-3 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleGenerateArticle}
                disabled={isLoading}
            >
                {isLoading ? 'Generating...' : 'Générer article'}
            </button>
        </div>
    );
}
