import { makeStyles , Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles (() => (  { 
banner : {
    backgroundImage : "url(./bannerHome.jpg)",

},
bannerContent : { 
    height : 400 , 
    display :"flex" , 
    flexDirection :"column" , 
    paddingTop : 25 , 
    justifyContent :"space-around"
} ,
tagline : { 

    height : "40%" , 
    display :"flex" , 
    flexDirection :"column" , 
   textAlign:"center",
    justifyContent :"center",
}

}))
const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className = {classes.bannerContent} > 
        <div className={classes.tagline}>
            <Typography
            variant ="h2"
            style = { { 
                fontWeight :"bold" , 
                marginBottom : 15,
                fontFamily :" Montserrat" , 
            }}
            > 
            Crypto Tracker 
                
            </Typography>
            <Typography
            variant ="subtitle2"
            style = { { 
                textTransform :"capitalize",
                color:"white",
                fontFamily :" Montserrat" , 
            }}
            > 
            Get all the info regarding your favorie Crypto coin
                
            </Typography>
            
            <Carousel> 
                
            </Carousel>
            </div> 

        </Container>

    </div>
  )
}

export default Banner