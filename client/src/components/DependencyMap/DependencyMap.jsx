import {useRef, useEffect} from 'react';
// import {Graph} from 'react-d3-graph';
import {runForceGraph} from './runForceGraph';
import {mockData} from './mockData';
import styles from './dependencyMap.module.css';

const DependencyMap = ({dependencyMapData}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      // const {destroy} = runForceGraph(containerRef.current, mockData);
      const {destroy} = runForceGraph(containerRef.current, dependencyMapData);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return (
    <div className={styles.dependencyMapWrapper}>
      <div ref={containerRef} className={styles.container} />
    </div>
  );
};

export {DependencyMap};
