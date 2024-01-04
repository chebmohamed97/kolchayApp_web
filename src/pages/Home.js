// Home.js
import React, { useState } from 'react';
import Annonce from '../components/annonce';
import items from '../data/exemples-annonces.json';
import FilterBarRegion from '../components/FilterBarRegion';
import FilterBarCategory from '../components/FilterBarCategory';


const Home = () => {
  const [filteredData, setFilteredData] = useState(items);
  return (
    <div>
      <div className='HomeHeader'>
      Kol-chay.tn
      </div>
      <div className='filterBar'>
      <FilterBarRegion data={items} setFilteredData={setFilteredData} />
    </div>
    <div className='filterBar'>
      <FilterBarCategory data={items} setFilteredData={setFilteredData} />
    </div>
    <div>
    {filteredData.map((item) => (
              <Annonce item={item} />
            ))}
    </div>
    </div>
    
  );
};

export default Home;
