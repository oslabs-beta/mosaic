import {useContext, createContext, useState} from 'react';
import PropTypes from 'prop-types';

const ProjectContext = createContext();

const Provider = ({children}) => {
  const [projectState, setProjectState] = useState({});

  const contextValues = {
    projectState,
    setProjectState,
  };

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
