import {useContext, createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const ProjectContext = createContext();

const Provider = ({children}) => {
  const [projectState, setProjectState] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem('mosaicCurrentProject');
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : {};
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return {};
    }
  });

  const setValue = (val) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = val instanceof Function ? val(projectState) : val;
      // Save state
      setProjectState(valueToStore);
      // Save to local storage
      window.localStorage.setItem('mosaicCurrentProject', JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const contextValues = {
    projectState,
    setProjectState: setValue,
  };

  console.log(projectState);

  return <ProjectContext.Provider value={contextValues}>{children}</ProjectContext.Provider>;
};

const useProjectContext = () => {
  const contextValues = useContext(ProjectContext);
  if (!contextValues) {
    throw new Error('useProjectContext must be used within ProjectContextProvider');
  }
  return contextValues;
};

Provider.propTypes = {
  children: PropTypes.array,
};

export {useProjectContext};
export default {
  Provider,
  ProjectContext,
};
