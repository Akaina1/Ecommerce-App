// BuildProvider.js
import React, { createContext, useContext, useState } from 'react';

const BuildContext = createContext();

export const BuildProvider = ({ children }) => {
  const [loadedBuild, setLoadedBuild] = useState(null);

  const handleLoadBuild = (build) => {
    console.log('Load build logic here');

    // Log loaded parts and total cost
    console.log('Loaded Parts:', build.parts);
    console.log('Total Cost:', build.totalPrice);

    // Set the build as loaded
    setLoadedBuild(build);
  };

  return (
    <BuildContext.Provider value={{ loadedBuild, handleLoadBuild }}>
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => {
  const context = useContext(BuildContext);

  if (!context) {
    throw new Error('useBuild must be used within a BuildProvider');
  }

  return context;
};