import { useState, useEffect } from 'react';

import * as firestore from '../firebase/firestore';

import dataFuelTypes from '../data/fuelTypes.json';
import dataGearTypes from '../data/gearTypes.json';
import dataBodyTypes from '../data/bodyTypes.json';
import dataCategories from '../data/categories.json';
import dataMakes from '../data/makes.json';
import dataNews from '../data/news.json';
import dataReviews from '../data/reviews.json'
// import dataCars from '../data/cars.json';

const useData = (collection) => {
  const [fuelTypes, setFuelTypes] = useState([]);
  const [gearTypes, setGearTypes] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [makes, setMakes] = useState([]);
  const [news, setNews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    switch(collection) {
      case 'fuelTypes':
        setFuelTypes(dataFuelTypes);
        break;
      case 'gearTypes':
        setGearTypes(dataGearTypes);
        break;
      case 'bodyTypes':
        setBodyTypes(dataBodyTypes);
        break;
      case 'categories':
        // firestore.getDocuments('categories').then((docs) => setCategories(docs.sort((a,b)=>(a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0)));
        setCategories(dataCategories);
        break;
      case 'makes':
        // firestore.getDocuments('makes').then((docs) => setMakes(docs.sort((a,b)=>(a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0)));
        setMakes(dataMakes);
        break;
      case 'news': 
        // firestore.getDocuments('news').then((docs) => setNews(docs.sort((a,b)=>(new Date(a.date) < new Date(b.date)) ? 1 : (new Date(a.date) > new Date(b.date)) ? -1 : 0)));
        setNews(dataNews);
        break;
      case 'reviews':
        setReviews(dataReviews);
        break; 
      case 'cars':
        firestore.getDocuments('cars').then((docs) => setCars(docs.sort((a,b)=>(a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0)));
        // setCars(dataCars);
        break;
      default:
        // do nothing
    }
  }, [collection]);

  return { fuelTypes, gearTypes, bodyTypes, categories, makes, news, reviews, cars };
}

export default useData;