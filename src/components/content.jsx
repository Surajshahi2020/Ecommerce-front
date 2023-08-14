import React, { useState } from "react";
import Draggable from "react-draggable";

const MainContent = () => {
  const [tables, setTables] = useState([]);
  const [plates, setPlates] = useState([]);

  const addTable = () => {
    setTables([...tables, { x: 50, y: 50 }]);
  };

  const addPlate = () => {
    setPlates([...plates, { x: 50, y: 500 }]);
  };

  const savePositions = () => {
    const positionsData = {};

    tables.forEach((table, index) => {
      const tableName = `table${index + 1}`;
      positionsData[tableName] = {
        position_x: table.x,
        position_y: table.y,
        name: "Table",
        restaurant: 1,
        plates: plates.map((plate) => ({
          position_x: plate.x,
          position_y: plate.y,
        })),
      };
    });

    const positionsDataFormatted = {
      table_data: positionsData,
    };

    console.log(JSON.stringify(positionsDataFormatted, null, 2));
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttons}>
        <button style={styles.addButton} onClick={addTable}>
          Add Table
        </button>
        <button style={styles.addButton} onClick={addPlate}>
          Add Plate
        </button>
      </div>
      {tables.map((position, index) => (
        <DraggableTable
          key={`table-${index}`}
          initialPosition={position}
          setTables={setTables}
          index={index}
        />
      ))}
      {plates.map((position, index) => (
        <DraggablePlate
          key={`plate-${index}`}
          initialPosition={position}
          setPlates={setPlates}
          index={index}
        />
      ))}
      <button type="submit" style={styles.save} onClick={savePositions}>
        Save
      </button>
    </div>
  );
};

const DraggableTable = ({ initialPosition, setTables, index }) => {
  const [position, setPosition] = useState(initialPosition);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });

    setTables((prevTables) =>
      prevTables.map((table, i) =>
        i === index ? { ...position, x, y, z: "table" } : table
      )
    );
  };
  return (
    <Draggable onDrag={handleDrag}>
      <div
        style={{
          ...styles.restaurantTable,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div style={styles.tableTop}></div>
      </div>
    </Draggable>
  );
};

const DraggablePlate = ({ initialPosition, setPlates, index }) => {
  const [position, setPosition] = useState(initialPosition);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
    setPlates((prevPlates) =>
      prevPlates.map((plate, i) =>
        i === index ? { ...position, x, y, z: "plate" } : plate
      )
    );
  };

  return (
    <Draggable onDrag={handleDrag}>
      <div
        style={{
          ...styles.plate,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
    </Draggable>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: "100vh",
    padding: "20px",
  },
  restaurantTable: {
    width: "200px",
    height: "200px",
    backgroundColor: "#cc66ff",
    border: "2px solid #ddd",
    position: "absolute",
  },
  tableTop: {
    width: "150px",
    height: "150px",
    backgroundColor: "pink",
    borderRadius: "50%",
    margin: "auto",
    position: "absolute",
    top: "25px",
    left: "25px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  plate: {
    width: "50px",
    height: "50px",
    backgroundColor: "#ff99ff",
    borderRadius: "50%",
    margin: "auto",
    position: "absolute",
    cursor: "pointer",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "10px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
    width: "150px",
  },
  save: {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
    width: "150px",
  },
};

export default MainContent;
