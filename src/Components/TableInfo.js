import React, { useEffect } from "react";
import "./form_style.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import  Snackbar  from "./Snakbar";

function TableInfo(props) {
  const [dataAvailable, setDataAvailable] = useState([]);
  const [isOnlySave, setIsOnlySave] = useState(false);
  const [selectedCell, setSelectedCell] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [isIndex, setIsIndex] = useState([]);
  const  [isUpdate,setIsUpdate]=useState(false)

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
            data.name= value.name;
            data.password=value.password
            data.username=value.username
            data.age=value.age
          }
        });
        console.log("updateddata", value);
        
        setDataAvailable([...dataValue])
        setIsUpdate(true)
        
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
    let data = jsonToCsv(dataAvailable, headersName);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `tabledata-modified.csv`;
    link.href = url;
    link.click();
  };

  const jsonToCsv = (data, headers) => {
    let headersdata = headers.join(",");
    console.log(headersdata);
    let dataArray = data;
    let eachRowData = [];
    dataArray.forEach((value) => {
      let eachArray = [];
      headers.forEach((headdata) => {
        if (headdata == "password") {
          let passwordlngth = value[headdata].length;
          let newpass = "";
          while (passwordlngth > 0) {
            newpass += "*";
            passwordlngth--;
          }

          eachArray.push(newpass);
        } else {
          eachArray.push(value[headdata]);
        }
      });

      eachRowData.push(eachArray.join(","));
    });

    let tabledata = eachRowData.join("\n");

    return headersdata + "\n" + tabledata;
  };

  const updateDatainFormCall = (index) => {
    setIsOnlySave(true)
    setIsUpdate(false)
    let data = dataAvailable[index];

    console.log("index", data);
    props.updateDatainForm(data);
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

          <tbody>
            {dataAvailable.length > 0 && !isOnlySave && !isDelete 
              ? dataAvailable.map((value, index) => (
                  <tr key={value.id}>
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
                      ><EditIcon />
                      </button>
                    </td>
                  </tr>
                ))
              : dataAvailable.length > 0 && isOnlySave && !isDelete 
              ? dataAvailable.map((row, index) => (
                  <tr key={row.id}>
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
      <Snackbar value={isUpdate}/>
      </div>
    </div>
  );
}

export default TableInfo;
