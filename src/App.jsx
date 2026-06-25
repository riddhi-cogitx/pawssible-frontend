import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import PromoBanners from './components/PromoBanners';
import AIAdvisor from './components/AIAdvisor';
import HealthTips from './components/HealthTips';
import Brands from './components/Brands';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ProductCard from './components/ProductCard';
import { useToast } from './hooks/useToast';

const API = 'https://pawssible-oi51.onrender.com';

export default function App() {
  const { toasts, showToast } = useToast();
  const [filterCategory, setFilterCategory] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async q => {
    setSearchQuery(q);
    setSearchLoading(true);
    setSearchResults([]);
    document.getElementById('search-results-section')?.scrollIntoView({ behavior: 'smooth' });
    try {
      const res = await fetch(`${API}/products/search?query=${encodeURIComponent(q)}&limit=12`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategory = cat => {
    setFilterCategory(cat);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
  <div
    style={{
      fontSize: 40,
      color: "red",
      padding: 50,
    }}
  >
    Hello Pawssible 🚀
  </div>
);
}
