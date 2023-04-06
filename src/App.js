import logo from './logo.svg';
import './App.scss';
import Forms from './Components/Forms';
import TableInfo from './Components/TableInfo';
import { useState } from 'react';
function App() {
 const [data,setData]=useState({})
 const [updateData,setUpdateData]=useState({})
  function sendData(value){
    
    setData(value)
    setUpdateData({})
    
  }
  function dataUpdate(value){
      console.log(value)
      setUpdateData(value)
      setData({})
  }
  return (
    <div className="App">
      <br/><br/>
      <br/><br/>
      <div className='main_div'>
     <Forms handleCallBack={sendData} value={updateData}></Forms>
     <TableInfo className="table_main" value={data} updateDatainForm={dataUpdate} ></TableInfo>
     </div>
    </div>
  );
}

export default App;
