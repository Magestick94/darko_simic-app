import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import ScrollToTop from './shared/ScrollToTop';
import Header from './shared/Header';
import Footer from './shared/Footer';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import NewsPage from './components/NewsPage';
import ReviewsPage from './components/ReviewsPage';
import CarsPage from './components/CarsPage';
import BuyersGuidePage from './components/BuyersGuidePage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route exact path="/" element={ <HomePage/> } />
          <Route path="/category/:cId" element={ <CategoryPage /> } />
          <Route path="/news/:nId" element={ <NewsPage /> } />
          <Route path="/reviews/:rId" element={ <ReviewsPage /> } />
          <Route path="/cars" element={ <CarsPage /> } />
          <Route path="/buyers-guide" element={ <BuyersGuidePage /> } />
          <Route path="/user-dashboard" element={ <UserPage /> } />
          <Route path="/admin-dashboard" element={ <AdminPage /> } />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}
