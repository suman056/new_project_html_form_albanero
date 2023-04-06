import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);
 React.useEffect(()=>{
    console.log("children",props)
    if(props.value==true){
    setOpen(true)
    }
},[props.value])
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
       
      <CheckCircleOutlineIcon/>
      
       updated sucessfully
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      
      <Snackbar
        open={open}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        autoHideDuration={6000}
        onClose={handleClose}
        message=""
        action={action}
      />
    </div>
  );
}