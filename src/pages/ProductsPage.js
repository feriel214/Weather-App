import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { useEffect } from 'react';
import axios from 'axios';
import './history.css'

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [country,setCountry] = useState("Rome")
  const [data,setData] = useState([])
  const [inputText,setInputText] = useState('Rome')

useEffect(() => {
  // * WEEKLY
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=7d1d0a1c7476326a58e0320ab3a62fc3&cnt=7`)
  .then((res)=>{ 
    console.log(res.data)
    setData(res.data)})
  .catch((e)=> {
    console.log(e)
  })

 
}, [country])

const handleSearch = (e) => {
  if (e.key === 'Enter') {
    setCountry(e.target.value);
    // setInputText('');
  }
};
  return (
    <>
      <Helmet>
        <title> Dashboard: History  </title>
      </Helmet>

      <Container>
      <TextField
            variant="filled"
            label="Search location"
            className="input"
          
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
        <Typography variant="h4" >
          Weather History of <span className='country'> {country && country}</span> ( last 7 days ) :
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
         
           
          </Stack>
        </Stack>

        {/* <ProductList products={PRODUCTS} /> */}
        <div>
<main className='history'>
 
  <ol class="gradient-list">
   {
    data && data.list &&  data.list.map((item,rank) => (
        <li key={rank} className="text-light flexy">
        
         <div>
          <b>Temperature</b> : {item.weather[0].main } / <b>Description </b> : {item.weather[0].description }
      <br></br><b> Wind speed </b> : {item.wind.speed } / <b>Wind degree </b> : {item.wind.deg }
      </div>
          {/* IMAGE */}
          <div>
          {item.weather[0].main === "Clouds" ? <img src="https://cdn-icons-png.flaticon.com/512/7084/7084486.png" width={"40px"} /> :
           item.weather[0].main === "Clear" ? <img src="https://cdn2.iconfinder.com/data/icons/weather-icons-8/512/day-clear-512.png" width={"40px"} /> : 
           item.weather[0].main === "Rain" ? <img src="https://icons.veryicon.com/png/o/weather/yochie-icons/rainy.png" width={"40px"} /> :
           <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" width={"40px"} />
           }
          </div>
       
          </li>
    ))
   }
   
  </ol>
</main>

    </div>
      </Container>
    </>
  );
}