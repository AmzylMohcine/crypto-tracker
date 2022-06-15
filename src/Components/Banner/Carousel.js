import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import {React , useState , useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import {Link} from 'react-router-dom';

const useStyle = makeStyles( () => ( { 
    carousel : { 
        height :"50%" ,
        display :"flex" , 
        alignItems:"center"

    },
    carouselItem : { 
        display : "flex "  , 
        flexDirection :"column" ,
        alignItems :"center" , 
        cursor :"pointer" , 
        textTransform :"uppercase" , 
        color :"white"
    
    }

}))
export function numberWithCommas(x) { 
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([]) ;
 const classes = useStyle();
 const {currency , symbol} = CryptoState();
 const fetchTrendigCoins = async () => { 
    const {data} = await axios.get(TrendingCoins(currency)) ;

    setTrending(data) ; 

 } ; 
 
useEffect(() => {
  fetchTrendigCoins() ;
}, [currency]) ; 

const items = trending.map((coin) => { 
    let profit  = coin.price_change_percentage_24h >= 0 ;
    return (
        <Link
        className={classes.carouselItem}
        to={`/coin/${coin.id}`}>
            <img 
            src ={coin?.image} 
            alt={coin.name} 
            height = "80"
            style= {{ 
                marginTop: 20 , 
                marginBottom : 10
            }}
/>  
<span> {coin?.symbol}</span>
<span
style={{
    color: profit > 0 ? "rgb(14 , 203 , 129)" : "red",
    fontWeight : 500,
}}
>
    {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
    </span>
<span style = {{fontSize : 22 , fontWeight : 500}} > 
{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
</span>

</Link>
    )
    
    })
const responsive = {
    0: {
        items : 2 ,
    } ,
    512 : { 
        items : 4 ,
    },
} ;

  return (
    <div className={classes.carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
            responsive={responsive}
            autoPlay
            items={items}
        >


        </AliceCarousel>
    </div>

  )
}

export default Carousel