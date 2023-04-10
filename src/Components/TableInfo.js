import React, { useEffect } from "react";
import "./form_style.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Snackbar from "./Snakbar";
import Papa from "papaparse";
import { Draggable,Droppable,DragDropContext } from "react-beautiful-dnd";

function TableInfo(props) {
  const [dataAvailable, setDataAvailable] = useState([]);
  const [isOnlySave, setIsOnlySave] = useState(false);
  const [selectedCell, setSelectedCell] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [isIndex, setIsIndex] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  let headersName = ["name", "age", "username", "password"];

  useEffect(() => {
    let value = props.value;

    if (Object.keys(value).length > 0) {
      if (!value["id"]) {
        let id = uuidv4();
        value["id"] = id;
        setDataAvailable((previousvalue) => [...previousvalue, props.value]);
      } else {
        let dataValue = dataAvailable;
        dataValue.forEach((data) => {
          if (data["id"] == value["id"]) {
            console.log("data", data);
            data.name = value.name;
            data.password = value.password;
            data.username = value.username;
            data.age = value.age;
          }
        });
        console.log("updateddata", value);

        setDataAvailable([...dataValue]);
        setIsUpdate(true);
      }
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

  const downloadFile = () => {
    console.log(dataAvailable);
    let newdata=JSON.parse(JSON.stringify(dataAvailable))
    let data = jsonToCsv(newdata);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `tabledata-modified.csv`;
    link.href = url;
    link.click();
  };

  const jsonToCsv = (newdata) => {
    newdata.forEach((value) => {
      delete value.id;
      let lenofPass = value.password.length;
      
      let newPass = "";
      while (lenofPass > 0) {
        newPass += "*";
        lenofPass--;
      }
      value.password = newPass;
      
    });
    
    const csv = Papa.unparse(newdata);
    return csv;

   
  };

  const updateDatainFormCall = (index) => {
    setIsOnlySave(true);
    setIsUpdate(false);
    let data = dataAvailable[index];
 
    console.log("index", data);
    props.updateDatainForm(data);
  };
  const handleDragEnd = (results) => {
    console.log(dataAvailable)
    console.log(results);
      if(results.destination!=null){
      let tempUser = [...dataAvailable];
      let selectedRow = tempUser.splice(results.source.index, 1);
      console.log(selectedRow)
      tempUser.splice(results.destination.index, 0, selectedRow[0]);
      console.log(tempUser)
      setDataAvailable([...tempUser]);
      console.log(dataAvailable)
      }
  };
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



       <DragDropContext onDragEnd={(results)=>handleDragEnd(results)}>
        <table>
          {dataAvailable.length > 0 && !isDelete & !isOnlySave ? (
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Username</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
          ) : dataAvailable.length > 0 && isDelete && !isOnlySave ? (
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Age</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
          ) : dataAvailable.length > 0 && !isDelete && isOnlySave ? (
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
            <Droppable droppableId="tbody">
              {(provided)=>(
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {dataAvailable.length > 0 && !isOnlySave && !isDelete
              ? dataAvailable.map((value, index) => (
                <Draggable draggableId={value.id} index={index} key={value.id}>
                  {(provided)=>(
                  <tr key={value.id} ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.username}</td>
                    <td>{value.password}</td>
                    <td className="edit_table_data">
                      <button
                        className="edit_button_row"
                        onClick={() => {
                          updateDatainFormCall(index);
                        }}
                      >
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                  )}
                  </Draggable>
                ))
              : dataAvailable.length > 0 && isOnlySave && !isDelete
              ? dataAvailable.map((row, index) => (
                <Draggable draggableId={row.id} index={index} key={row.id}>
                  {(provided)=>(
                  <tr key={row.id} ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps} >
                    {headersName.map((head) => (
                      <td
                        key={`${row.id}-${head}`}
                        onClick={() =>
                          setSelectedCell({
                            row: index,
                            column: head,
                          })
                        }
                        contentEditable={
                          selectedCell &&
                          selectedCell.row === index &&
                          selectedCell.column === head
                        }
                        suppressContentEditableWarning={true}
                        type="password"
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
                  )}
                  </Draggable>
                ))
              : dataAvailable.length > 0 && !isOnlySave && isDelete
              ? dataAvailable.map((value, index) => (
                <Draggable draggableId={value.id} index={index}  key={value.id}>
                  {(provided)=>(
                  <tr key={value.id} ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
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
                  )}
                  </Draggable>
                ))
              : ""}
               {provided.placeholder}
          </tbody>

          )}
          </Droppable>
        </table>

        </DragDropContext>

      </div>
      <div>
        {dataAvailable.length > 0 && !isDelete && !isOnlySave ? (
          <button
            onClick={() => {
              downloadFile();
            }}
          >
            <FileDownloadIcon />
          </button>
        ) : (
          ""
        )}
      </div>
      <div>
        <Snackbar value={isUpdate} />
      </div>
    </div>
  );
}

export default TableInfo;
