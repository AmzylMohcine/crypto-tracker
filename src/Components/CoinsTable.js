import { Typography  , TextField  , makeStyles, TableContainer , LinearProgress , Table , TableHead , TableRow , TableCell , TableBody} from '@material-ui/core';
import { Container, createTheme, ThemeProvider } from '@mui/system';
import axios from 'axios';
import {React , useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';


const useStyle = makeStyles( () => ( { 
  textfield : { 
      width :"100%" ,
      marginBottom : "20" , 
      background :"white",
  },

}))




const CoinsTable = () => {
  const classes = useStyle();

  const [coins, setCoins] = useState([]) ; 
  const [loading, setLoading] = useState(false) ; 

  const [search, setSearch] = useState([]) ; 

  const navigate = useNavigate();



  const { currency } = CryptoState();


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
      main : "#fff" , 
    } , 
    type :"dark" ,
  }) ;

  const handleSearch = () => { 
    return coins.filter((coin) => { 
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    })
  }

  
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
                {handleSearch().map((row) => { 
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
                      gap : 15 ,}}

                    ></TableCell>

                    </TableRow>
                  )
                })}

 </TableBody>
 
            </Table>
          )}
        </TableContainer>

        </Container>

    </ThemeProvider> 
  )
}

export default CoinsTable