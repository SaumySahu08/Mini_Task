import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from "./ThemeToggle";



function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const storeUserName = localStorage.getItem("username");

    if (!token || !storeUserName) {
      navigate("/login");
      return;
    }

    setUser({ username: storeUserName });
  }, [navigate]);

  const loadPosts = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
      );

      const newPosts = res.data.posts;
      setPosts((prev) => [...prev, ...newPosts]);
      setSkip((prev) => prev + limit);

      if (skip + limit >= res.data.total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading posts", error);
    } finally {
      setLoading(false);
    }
  }, [limit, skip, hasMore, loading]);


  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user, loadPosts]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= bottom && hasMore && !loading) {
        loadPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadPosts, hasMore, loading]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (

    <div className="bg-gray-100 min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
     <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 dark:bg-gray-800 text-white shadow">
  <h1 className="text-xl font-bold">MyFeed</h1>

  <div className="flex items-center gap-6">
    <Link to="/users" className="hover:text-blue-300 font-medium">Users</Link>
    <Link to="/products" className="hover:text-blue-300 font-medium">Products</Link>
    <ThemeToggle />
    <span className="font-medium">{user?.username}</span>
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
    >
      Logout
    </button>
  </div>
</nav>

      {/* Feed */}
      <main className="max-w-3xl mx-auto p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
          </div>
        ))}

        {/* Loader / End Message */}
        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading more posts...
          </p>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No more posts to load.
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;