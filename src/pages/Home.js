// Home.js
import React, { useState , useEffect } from 'react';
import Annonce from '../components/annonce';
import items from '../data/exemples-annonces.json';
import FilterBarRegion from '../components/FilterBarRegion';
import FilterBarCategory from '../components/FilterBarCategory';
import LogInStatus from '../components/logInStatus';
import { useDeviceWidth } from '../contexts/WidthContext';

const Home = () => {
  const [filteredData, setFilteredData] = useState(items);

  const { isMobile } = useDeviceWidth();

  console.log(isMobile);
  return (
    <div>
      <LogInStatus />      
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
