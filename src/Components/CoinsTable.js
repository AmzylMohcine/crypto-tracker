import { Typography  , TextField  , makeStyles, TableContainer , LinearProgress , Table , TableHead , TableRow , TableCell , TableBody } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Container, createTheme, ThemeProvider  } from '@mui/system';
import axios from 'axios';
import {React , useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';


const useStyle = makeStyles( () => ( { 
  textfield : { 
      width :"100%" ,
      marginBottom : "20" , 
      background :"white",
  },
  row : { 
    backgroundColor:"#16171a", 
    cursor :'pointer' , 
    "&:hover" :  { 
      background:"#131111",
    } ,
    fontFamily :"Montserrat"
  },
  pagination: { 
    "& .MuiPaginationItem-root" : { 
      color: "white",
    }, 
    "& .MuiPaginationItem-page.Mui-selected" : { 
      backgroundColor : "gold" , 
    }
  }

}))

const CoinsTable = () => {
  const classes = useStyle();

  const [coins, setCoins] = useState([]) ; 
  const [loading, setLoading] = useState(false) ; 
  const [search, setSearch] = useState([]) ; 
  const [page, setPage] = useState(1)

  const navigate = useNavigate();



  const { currency , symbol } = CryptoState();


  const fetchCoins = async () => { 

    setLoading(true);
    const {data} = await axios.get(CoinList(currency)) ;

    setCoins(data);
    setLoading(false);
  } ;

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme( { 
    palette : {
      primary :{ 
        main : "#fff" , 
      },
      type :"dark" ,
    } , 
  
  }) ;

  const handleSearch = () => { 
    return coins.filter(
      (coin) => 
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    ) ;
  } ;

  return (
    <ThemeProvider theme= {darkTheme}>

      <Container style = {{ textAlign :"center" }}>
        <Typography 
        variant ="h4"
        style = {{
          margin : 18 , fontFamily :"Montserrat"
        }} > 

        Crypto Currency by Market cap

        </Typography>

        <TextField label="Search for a Crypto Currency .. "
        variant='outlined'
        className= {classes.textfield}
        
        onChange = { (e) =>setSearch(e.target.value)}/>


        <TableContainer > 
          {  loading ? (
            <LinearProgress style={{ backgroundColor :"gold"}} />
          ) : (
            <Table>
              <TableHead
              style= { {  backgroundColor :"#EEBC1D"}}> 
              <TableRow> 
                {["Coin" , "Price" , "24h Change " , "Market Cap"].map((head) => (
                  <TableCell
                  style = {{
                    color: "black" ,
                    fontWeight: "700" , 
                    fontFamily: "Montserrat",
                  }} 
                  key={head}
                  align= {head === "Coin" ? "" : "right"}>
                  {head}
                  </TableCell>

                ))}


              </TableRow>

              </TableHead>
              <TableBody > 
                {handleSearch()
                .slice((page-1) * 10 , (page -1 ) * 10 +10)
                .map((row) => { 
                  const profit = row.price_change_percentage_24h > 0 ; 

                  return ( 
                    <TableRow 
                    onClick = { () => navigate(`/coins/${row.id}`)}
                    className = {classes.row}
                    key = {row.name}

                    > 
                  

      
                    <TableCell component='th' scope="row" 
                    styles = {{
                      display:"flex" , 
                      gap : 15 ,}} >
                        <img  src={row?.image} alt ={row.name} height="50" style= {{marginBottom: 10  }}/>
                        <div style={{display:"flex" , flexDirection : "column"}}> 
                        <span style={{
                      textTransform:"uppercase",
                      fontSize : 22 ,
                      color:"white",
                    }}> 
                    {row.symbol}

                    </span>
                    <span style={{color:"darkgrey" }}> {row.name} </span>

                        </div>

                    </TableCell>
                    <TableCell align='right' style = {{color:"white" , fontSize: 15}}> 
                    {symbol} {" "} 
                    {numberWithCommas(row.current_price.toFixed(2))}

                    </TableCell>
                    <TableCell 
                    align='right'  
                    style={{
                      color: profit > 0 ? "rgb(14 , 203 ,129)" : "red" ,
                      fontWeight: 500 ,
                    }}> 

                    {profit && "+"}
                    {row.price_change_percentage_24h.toFixed(2)}%


                    </TableCell>

                    <TableCell align='right' style = {{color:"white" , fontSize: 15}}> 
                    {symbol} {" "} 
                    {numberWithCommas(row.market_cap.toString().slice(0,-6))}M 

                    </TableCell>

                    </TableRow>
                  )
                })}

 </TableBody>
 
            </Table>
          )}
        </TableContainer>
<Pagination 
classes={{ul : classes.pagination}}
style={{
  width :"100%" , 
  display :"flex" , 
  justifyContent:"center" ,
  padding : 20 ,
}}
count = {(handleSearch()?.length / 10).toFixed(0)} 
onChange = {(_, value) =>  { 
  setPage(value) ; 
  window.scroll(0,450) ; }}
/>

        </Container>

    </ThemeProvider> 
  )
}

export default CoinsTable