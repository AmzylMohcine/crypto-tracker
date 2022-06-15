import React from 'react'
import { AppBar , Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles (() => ( { 
    title : { 
        flex : 1 , 
        color :"white" , 
        fontFamily : 'Montserrat' ,
        fontWeight : 'bold' , 
        cursor :"pointer" ,
    },
})) ; 


export const Header = () => {
    const classes = useStyles() ;
    const navigate = useNavigate();
    
    const {currency , setCurrency} = CryptoState ();
    
    const darkTheme = createTheme({ 
        palette: { 
            primary: { 
                main : "#fff" , 
            } , 
            type: "dark"
        } , 
    }) ;
return (
    <ThemeProvider theme={darkTheme}> 
    <AppBar color='transparent' position='static'> 
    <Container> 
        <Toolbar> 
            <Typography className={classes.title} onClick = { () => navigate("/")} variant='h6' > 
                Crypto Tracker
            </Typography>
            <Select variant='outlined' style={
                {
                    width : 100  , 
                    height : 40, 
                    marginRight : 15 ,
                    color:"green" ,
                    fontWeight :"bold"
                    
                }}
                value ={currency} 
                onChange = { (e) => setCurrency(e.target.value)}
                > 
                <MenuItem value ={'USD'} > USD </MenuItem>
                <MenuItem value ={'MAD'} > MAD </MenuItem>
                <MenuItem value ={'EUR'} > EUR </MenuItem>
                
            </Select>
        </Toolbar>

    </Container>


    </AppBar>
    </ThemeProvider>
)
}

export default Header ;
