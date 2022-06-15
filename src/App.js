
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import './App.css';
import React from 'react' ;
import Header from './Components/Header' ;
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import 'react-alice-carousel/lib/alice-carousel.css';


const useStyles = makeStyles (() => ( { 
  App: { 
    background : "black" , 
    color : "white" , 
    minHeight :"100vh"
  }

}));


function App() {
 
  const classes = useStyles();
  return (
 <Router> 
 <div className={classes.App}> 
  <Header/>
  <Routes> 
    <Route path='/' element = {<Homepage/>}   />  
    <Route path='/coins/:id' element = {<CoinPage/>}  />
  </Routes>
  
 </div>
 </Router>
  );
}

export default App;
