import logo from './logo.svg';
import './App.scss';
import Forms from './Components/Forms';
import TableInfo from './Components/TableInfo';
import { useState } from 'react';
function App() {
 const [data,setData]=useState({})
  function CallBack(value){
    
    setData(value)
   
  }
  return (
    <div className="App">
      <br/><br/>
      <br/><br/>
      <div className='main_div'>
     <Forms handleCallBack={CallBack}></Forms>
     <TableInfo className="table_main" value={data} ></TableInfo>
     </div>
    </div>
  );
}

export default App;
