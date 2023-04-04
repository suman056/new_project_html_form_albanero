import React, { useEffect } from "react";
import "./form_style.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TableInfo(props) {
  const [dataAvailable, setDataAvailable] = useState([]);
  const [isOnlySave, setIsOnlySave] = useState(false);
  const [selectedCell, setSelectedCell] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [isIndex, setIsIndex] = useState([]);

  let headersName = ["name", "age", "username", "password"];

  useEffect(() => {
    let value = props.value;

    if (Object.keys(value).length > 0) {
      let id = uuidv4();
      value["id"] = id;
      setDataAvailable((previousvalue) => [...previousvalue, props.value]);
    }
  }, [props.value]);
  const handleEdit = () => {
    if (!isDelete) {
      setIsOnlySave(true);
    }
  };
  const handleSave = () => {
    setIsOnlySave(false);
  };
  const handleDeleteOption = () => {
    if (!isOnlySave) {
      setIsDelete(true);
    }
  };
  const deleteForEver = () => {
    let arrayData = dataAvailable;
    isIndex.forEach((index) => arrayData.splice(index, 1));
    let nullvalue = [];
    setIsIndex([...nullvalue]);
    setDataAvailable([...arrayData]);

    setIsDelete(false);
  };
  const deleteHanlde = (e, index) => {
    let indexArray = isIndex;
    if (e.target.checked) {
      indexArray.push(index);
      setIsIndex([...indexArray]);
    } else {
      if (indexArray.indexOf(index) > -1) {
        indexArray.splice(indexArray.indexOf(index), 1);
        setIsIndex([...indexArray]);
      }
    }
  };
  const deleteHandleForm=()=>{
    console.log(dataAvailable)
    setDataAvailable([])
  }
  return (
    <div className="main_container">
      <h2>TableInfo</h2>
      <div className="buttons">
        <div>
          {dataAvailable.length > 0 && !isOnlySave ? (
            <button
              onClick={() => {
                handleEdit();
              }}
            >
              <EditIcon />
            </button>
          ) : dataAvailable.length > 0 && isOnlySave ? (
            <button
              onClick={() => {
                handleSave();
              }}
            >
              <SaveIcon />
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          {dataAvailable.length > 0 && !isDelete ? (
            <button
              onClick={() => {
                handleDeleteOption();
              }}
            >
              <DeleteIcon />
            </button>
          ) : dataAvailable.length > 0 && isDelete ? (
            <button
              onClick={() => {
                deleteForEver();
              }}
            >
              <DeleteForeverIcon />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <br />
      <div className="table_format">
        <table>
          {dataAvailable.length > 0 && !isDelete ? (
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
          ) : dataAvailable.length > 0 && isDelete ? (
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Age</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
          ) : (
            ""
          )}

          <tbody>
            {dataAvailable.length > 0 && !isOnlySave && !isDelete
              ? dataAvailable.map((value) => (
                  <tr key={value.id}>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.username}</td>
                    <td>{value.password}</td>
                  </tr>
                ))
              : dataAvailable.length > 0 && isOnlySave && !isDelete
              ? dataAvailable.map((row, index) => (
                  <tr key={row.keyValue}>
                    {headersName.map((head) => (
                      <td
                        key={`${row.id}-${head}`}
                        onClick={() =>
                          setSelectedCell({ row: index, column: head })
                        }
                        contentEditable={
                          selectedCell &&
                          selectedCell.row === index &&
                          selectedCell.column === head
                        }
                        suppressContentEditableWarning={true}
                        onBlur={(event) => {
                          const newValue = event.target.innerText;
                          const newData = [...dataAvailable];
                          newData[index] = {
                            ...newData[index],
                            [head]: newValue,
                          };
                          setDataAvailable(newData);
                        }}
                        className={
                          selectedCell &&
                          selectedCell.row === index &&
                          selectedCell.column === head
                            ? "selected-cell"
                            : ""
                        }
                      >
                        {row[head]}
                      </td>
                    ))}
                  </tr>
                ))
              : dataAvailable.length > 0 && !isOnlySave && isDelete
              ? dataAvailable.map((value, index) => (
                  <tr key={value.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox_class"
                        onChange={(e) => {
                          deleteHanlde(e, index);
                        }}
                      />
                    </td>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.username}</td>
                    <td>{value.password}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        
      </div>
      
    </div>
  );
}

export default TableInfo;
