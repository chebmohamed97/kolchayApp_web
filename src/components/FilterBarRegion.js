import React, { useState, useMemo } from "react";

const FilterBarRegion = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  // Extract unique regions from data
  const uniqueRegions = useMemo(() => {
    const regionSet = new Set(data.map((item) => item.region.toUpperCase()));
    return Array.from(regionSet);
  }, [data]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);

    // Apply the filter to the data
    const filteredData = data.filter(
      (item) =>
        item.region.toUpperCase().includes(newFilter.toUpperCase()) ||
        item.title.toUpperCase().includes(newFilter.toUpperCase()) ||
        item.author.toUpperCase().includes(newFilter.toUpperCase()) ||
        item.serviceType.toUpperCase().includes(newFilter.toUpperCase()) ||
        item.category.toUpperCase().includes(newFilter.toUpperCase()) ||
        item.content.toUpperCase().includes(newFilter.toUpperCase()) ||
        String(item.idAnnonce).includes(newFilter)
    );
    setFilteredData(filteredData);
  };

  return (
    <div>
      <label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All regions</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FilterBarRegion;
