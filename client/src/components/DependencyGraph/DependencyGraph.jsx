import {useRef, useEffect} from 'react';
// import {Graph} from 'react-d3-graph';
import {runForceGraph} from './runForceGraph';
import {mockData} from './mockData';
import styles from './dependencyGraph.module.css';
// const myConfig = {
//   automaticRearrangeAfterDropNode: true,
//   collapsible: false,
//   directed: false,
//   focusAnimationDuration: 0.75,
//   focusZoom: 1,
//   freezeAllDragEvents: true,
//   height: 500,
//   // highlightDegree: 1,
//   // highlightOpacity: 1,
//   linkHighlightBehavior: false,
//   maxZoom: 8,
//   minZoom: 0.1,
//   nodeHighlightBehavior: true,
//   panAndZoom: false,
//   staticGraph: false,
//   staticGraphWithDragAndDrop: false,
//   width: 500,
//   d3: {
//     alphaTarget: 0.05,
//     gravity: -100,
//     linkLength: 100,
//     linkStrength: 1,
//     disableLinkForce: false,
//   },
//   node: {
//     color: '#d3d3d3',
//     fontColor: 'black',
//     fontSize: 8,
//     fontWeight: 'normal',
//     highlightColor: '#1890ff',
//     highlightFontSize: 8,
//     highlightFontWeight: 'normal',
//     highlightStrokeWidth: '#1890ff',
//     labelProperty: 'id',
//     mouseCursor: 'pointer',
//     opacity: 1,
//     renderLabel: true,
//     size: 200,
//     strokeColor: 'none',
//     strokeWidth: 1.5,
//     svg: '',
//     symbolType: 'circle',
//   },
//   link: {
//     color: '#d3d3d3',
//     fontColor: 'black',
//     fontSize: 8,
//     fontWeight: 'normal',
//     highlightColor: 'SAME',
//     highlightFontSize: 8,
//     highlightFontWeight: 'normal',
//     labelProperty: 'label',
//     mouseCursor: 'pointer',
//     opacity: 1,
//     renderLabel: false,
//     semanticStrokeWidth: false,
//     strokeWidth: 2,
//     markerHeight: 6,
//     markerWidth: 6,
//     strokeDasharray: 0,
//     strokeDashoffset: 0,
//     strokeLinecap: 'butt',
//   },
// };

const DependencyGraph = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const {destroy} = runForceGraph(containerRef.current, mockData);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={styles.container} />;
};

export {DependencyGraph};

// const onClickNode = function (nodeId) {
//   window.alert(`Clicked node ${nodeId}`);
// };

// const onClickLink = function (source, target) {
//   window.alert(`Clicked link between ${source} and ${target}`);
// };

// return (
//   <Graph
//     id="graph-id" // id is mandatory
//     data={mockData}
//     config={myConfig}
//     // onClickNode={onClickNode}
//     // onClickLink={onClickLink}
//   />
// );
