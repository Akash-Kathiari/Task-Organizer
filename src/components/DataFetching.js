import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://my-json-server.typicode.com/ak2378/project2DB/tasks";

function DataFetching() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(URL);
    setTasks(response.data);
  };

  const renderHeader = () => {
    let headerElement = ["id", "title", "type", "description", "column"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      tasks &&
      tasks.map(({ id, title, type, description, column }) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{type}</td>
            <td>{description}</td>
            <td>{column}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <h1 id="title">React Table</h1>
      <table id="tasks">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
}

export default DataFetching;
