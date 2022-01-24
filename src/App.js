import './App.css';
import Header from './components/Header'
import CharacterTable from './components/CharacterTable'
import axios from 'axios'
import React , {useEffect,useState} from 'react'
import Search from './components/Search'

const hash =  "f7db5233eb4eee591342bce92ee591d1"

function App() {
  const[items,setItems] = useState([])
  const[isLoading,setLoading] = useState(true)
  const [query,setQuery] = useState('')

  useEffect(()=>{
      const fetch = async()=>{
        if(query===''){
          if(localStorage.getItem('favorites')==='[]' || !localStorage.getItem('favorites')){
            localStorage.setItem('favorites', '[]')
            const result = await axios(`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=591fd29e2ac10807f584561942989db6&hash=${hash}`)
            console.log(result.data.data.results)
            setItems(result.data.data.results)
            setLoading(false) 
          }else{
            let favorite = JSON.parse(localStorage.getItem('favorites'))
            setItems(favorite)
            setLoading(false)
          }
          
          
        }else{
          const result = await axios(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=591fd29e2ac10807f584561942989db6&hash=${hash}`)
          console.log(result.data.data.results)
          setItems(result.data.data.results)
          setLoading(false)
        }
      
    }

    fetch()
  },[query])

  return (
    <div className="container">
      <Header />
      <Search search={(q)=>setQuery(q)}></Search>
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;
