'use client';
import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/app/lib/AuthContext";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (user?.uid) {
          const q = query(
            collection(db, "articles"),
            where("ownerId", "==", user.uid) // Pobranie artykułów zalogowanego użytkownika
          );
          const querySnapshot = await getDocs(q);
          const articlesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setArticles(articlesData);
        }
      } catch (e) {
        console.error("Error fetching articles:", e);
        setError("Wystąpił błąd podczas pobierania artykułów.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user]);

  if (loading) {
    return <p>Ładowanie artykułów...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Twoje Artykuły</h1>
      {articles.length === 0 ? (
        <p>Nie znaleziono artykułów.</p>
      ) : (
        <ul>
          {articles.map(article => (
            <li key={article.id} className="mb-2">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
