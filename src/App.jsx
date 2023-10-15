/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import Listing from './components/Listing'
import Banned from './components/Listing'


const URL = 'https://api.thedogapi.com/v1/images/search?has_breeds=1'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {

  const [storedData, setStoredData] = useState({});
  
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [breedGroup, setBreedGroup] = useState();
  const [bredFor, setBredFor] = useState();
  const [lifeSpan, setLifeSpan] = useState();
  const [banList, setBanList] = useState([]);

  const fetchData = async () => {
    const response = await fetch(URL, {headers: {'x-api-key': ACCESS_KEY}});
    const data = await response.json();

    const exist = handleBan(data);

    if(exist) {
      return fetchData();
    }

    setStoredData(data);
    
  }

  const showListing = () => {

    console.log(storedData);

    {storedData.map((item) => {
      setImage(item.url);
      {item.breeds.map((x) => {
        setName(x.name);
        setBredFor(x.bred_for);
        setBreedGroup(x.breed_group);
        setLifeSpan(x.life_span);
      })}

    })}
    

  }

  const handleClick = () => {


    fetchData();

    showListing();



  }

  const addToBanned = (item) => {

    console.log(banList);

    const newBanList = [...banList, item];

    setBanList(newBanList);

    console.log(newBanList);

  }

  const handleBan = (target) => {

    let banGroup = '';
    let banBred = '';
    let banLife = '';

    {target.map((item) => {
      item.breeds.map((x) => {
        banBred=x.bred_for;
        banGroup=x.breed_group;
        banLife=x.life_span;
      })
    })}

    const exist = banList.find((ban) => ban === banBred || ban === banGroup || ban === banLife);

    return exist;

  }

  useEffect(() => {
    
    fetchData();

  },[])
  

  return (
    <>
    <div id='root'>
      <div className='container'>
        <h1>Dog Roulette</h1>
        <h3>Take a chance on your dream dog!</h3>
        <br /><br />

        <div className='discover-container'>
          {image === undefined ? null : (
            <div className='listing-container'>
            <h2>{name}</h2>
            <div className='btn-container'>
              <button className='attribute-btn' onClick={() => addToBanned(bredFor)} >{bredFor}</button>
              <button className='attribute-btn' onClick={() => addToBanned(breedGroup)} >{breedGroup}</button>
              <button className='attribute-btn' onClick={() => addToBanned(lifeSpan)} >{lifeSpan}</button>
            </div>
            <img src={image} height='250px' width='250px' />
          </div>
          )}
          
          <button className='discover-btn' onClick={() => handleClick()}>Discover</button>
        </div>
      
      </div>

      

      <div className='sideBar'>
        <h2>Ban List</h2>
        <h4>Select an attribute to ban it</h4>
        {banList.map((item, index) => {
          return (
            <button className='ban' key={index} >{item}</button>
          );
        })}
      </div>
    </div>
    </>
  )
}

export default App
