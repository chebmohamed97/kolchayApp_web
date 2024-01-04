import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceWidthContext = createContext();

export const DeviceWidthProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DeviceWidthContext.Provider value={{ isMobile }}>
      {children}
    </DeviceWidthContext.Provider>
  );
};

export const useDeviceWidth = () => {
  return useContext(DeviceWidthContext);
};
