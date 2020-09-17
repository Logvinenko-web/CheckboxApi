import React, { useState } from 'react';
 import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
    import { Dialog, DialogTitle,DialogContent } from '@material-ui/core';
  import Button from '@material-ui/core/Button';
  import TextField from '@material-ui/core/TextField';
  import axios from 'axios'
   import Typography from '@material-ui/core/Typography';
  import { makeStyles } from '@material-ui/core/styles';
   import {useForm, Controller} from 'react-hook-form'
 
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
 

export default function ButtonAppBar() {
      const classes = useStyles();
    const {register, handleSubmit, control} = useForm()
 const [open, setOpen] = useState(false)
 const [token, setToken] = useState(``)
  const beerToken = {headers: {
  Authorization: 'Bearer ' + token,
  
}} 
const shiftKey = {headers: {
  Authorization: 'Bearer ' + token,
  'X-License-Key': '0beffb908b7b1331b31d9e04'

}} 
 const handleClickOpen=()=>{
  setOpen(true);

 }
const handleClose = ({login,password}) => {
  axios.post(`https://dev-api.checkbox.in.ua/api/v1/cashier/signin`, {login,password})
  .then(res=>{
    setToken(res.data.access_token)
  })
  .catch(err=>{
      console.log(err)
  })  
  
  setOpen(false);
}
 
function createShifts() {
  axios.defaults.baseURL = 'https://dev-api.checkbox.in.ua​'
  axios({
    method: 'post',
    url: encodeURI(`/api​/v1​/shifts`).replace(/%E2%80%8B/g, ''),
    headers: {
      Authorization: 'Bearer ' + token,
  'X-License-Key': '0beffb908b7b1331b31d9e04',
    }
  })
  .then(function(response) {
   console.log(response)
  });
}
function getShift() {
  return axios.get(`https://dev-api.checkbox.in.ua/api/v1/cashier/shift`,beerToken).then(res=>{console.log(res)})
}
   function closeShifts() {
      axios.defaults.baseURL = 'https://dev-api.checkbox.in.ua​'
      axios({
        method: 'post',
        url: encodeURI(`/api/v1/shifts/close`).replace(/%E2%80%8B/g, ''),
        headers: {
          Authorization: 'Bearer ' + token,
         }
      })
      .then(function(response) {
       console.log(response)
      });
  }
 
  return (
    <div>
      <AppBar position="static" className="Login">
        <Toolbar>
          
          <Typography variant="h6">
            Checkbox
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          <Dialog open={open} onClose={handleClose} arial-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>
            Authorization
            </DialogTitle>
            <DialogContent>
            <form className={classes.form} noValidate onSubmit={handleSubmit(handleClose)}>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="login"
              label="Login Cashier"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
              autoComplete="current-password"
            />
             
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            
          </form>

            </DialogContent>
            
          </Dialog>
        </Toolbar>
      </AppBar>
      <Button   color="primary" onClick={createShifts}>create Shifts</Button> 	
      <Button   onClick={getShift}>Get shift</Button>
      <Button color="secondary" onClick={closeShifts}> Closes shift</Button>

    </div>
  );
}
