import React, { useEffect, useState } from 'react';
import { Tree } from './Tree';
import { inputs } from './testData';
import './App.css';

function App() {

  const [data, setData] = useState([]);


  const makeDataTree = (dataset, id, parentNodeName, childNodesName) => {
    const hashTable = {};

    dataset.forEach(
      (item) => (hashTable[item[id]] = { ...item, [childNodesName]: [] })
    );

    const dataTree = [];
    dataset.forEach((item) => {
      if (item[parentNodeName] && hashTable[item[parentNodeName]]) {
        hashTable[item[parentNodeName]][childNodesName].push(hashTable[item[id]]);
      } else {
        dataTree.push(hashTable[item[id]]);
      }
    });

    return dataTree;
  };

  const sortNav = items => {
    let result = [...items].sort(function (a, b) {

      return a.sorthead - b.sorthead;
    })

    for (let i = 0; i < items.length; i++) {
      if (items[i].childNodes && items[i].childNodes.length) {
        items[i].childNodes = sortNav(items[i].childNodes);
      }
    }
    return result;
  };

  useEffect(() => {

    const dataTree = makeDataTree(inputs.services, "id", "head", "childNodes");

    const dataSortedTree = dataTree.map((item) => {
      if (item.childNodes.length > 0) {
        sortNav(item.childNodes);
      }
      return item;
    });

    setData(dataSortedTree);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const treeHandler = (e) => {
    e.target.classList.toggle("caret-down"); e.target.parentElement.querySelector(".nested").classList.toggle("active");
  }


  return (
    <div className="App">
      <Tree data={data} ulClass={'nested'} liClass={'caret'} treeHandler={treeHandler} treeClassName={'tree'} />
    </div>
  );
}

export default App;

