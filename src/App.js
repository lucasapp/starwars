import React, { useEffect, useState } from 'react';
import './App.css';
import $ from 'jquery';

function App() {
  const [starships, setStarships] = useState([]);
  const [newStarships, setNewStarships] = useState([]);
  const [distance, setDistance] = useState('');

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    $.ajax({
      url: 'https://swapi.dev/api/starships/',
      method: 'get',
      dataType: 'json',
      success: (ret) => {
        let arrayStarships = [];
        for (let starship of ret.results) {
          arrayStarships.push({ name: starship.name, hours: convertHours(starship.consumables), mglt: starship.MGLT });
        }
        setStarships(arrayStarships);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  const stopsCalculator = (e) => {
    e.preventDefault();
    let arrayStarships = [];
    for (let starship of starships) {
      let paradas = (distance / (starship.hours * starship.mglt));
      arrayStarships.push({ name: starship.name, stops: parseInt(paradas) })
    }
    setNewStarships(arrayStarships);
    setDistance("");
  }

  return (
    <>
      <div className="header">Calculadora Star Wars</div>
      <div className="main">
        <p>Este Programa calcula quantas paradas são nescessárias para uma nave de Star Wars percorrer uma determinada distância.</p>
        <form onSubmit={e => stopsCalculator(e)}>
          <label htmlFor="distance">Digite uma distância:</label>
          <input type="number" value={distance} name="distance" id="distance" required onChange={(e) => setDistance(e.target.value)}/>
          <button type="submit">Calcular</button>
          <button type="button" onClick={e => setNewStarships([])}>Limpar</button>
        </form>
          {newStarships.map(starship =>
            <div key={starship.name}>{starship.name}: {starship.stops}</div>
          )}
      </div>
    </>
  );
}

export default App;

const convertHours = (consumables) => {
  let hours = 0;
  if (consumables.includes('year')) {
    hours = parseInt(consumables) * 8760;
  } else if (consumables.includes('month')) {
    hours = parseInt(consumables) * 730;
  } else if (consumables.includes('week')) {
    hours = parseInt(consumables) * 168;
  } else if (consumables.includes('day')) {
    hours = parseInt(consumables) * 24;
  }
  return hours;
}


