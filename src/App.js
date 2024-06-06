import react,{useEffect, useState,useffect} from 'react';
import axios from 'axios';

const App= () =>{
  const[brands, setBrands]=useState([]);
  const[models, setModels]=useState([]);
  const[years, setYars]=useState([]);
  const[selectedBrand, setSelectedBrand]=useState('');
  const[selectedmodel, setSelectedModel]=useState('');
  const[selectedYear, setSelectedYear]=useState('');
  const[vehicleData, setVehicleData]=useState(null);

  useEffect(()=>{
    axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    .then(response=>{
      setBrands(response.data);
    })

    .catch(error =>{
      console.error("There was an error fetching the brands!",error);
    });
  },[]);

  useEffect(()=>{
    if(setSelectedBrand){
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos`)
      .then(response =>{
        setModels(response.data.modelos);
      })
      .catch(error=>{
        console.error("there was an error fetching the models!",error);
      });
    }
  },[selectedBrand]);

  useEffect(()=>{
    if(selectedmodel){
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedmodel}/anos/${selectedYear}`)
      .then(response => {
        setVehicleData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the vehicle data!", error);
      });
  }
}, [selectedYear,selectedmodel, selectedBrand]);

return (
  <div>
    <h1>Busca por Veículos </h1>
    <div>
      <label>Brand:</label>
      <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
        <option value="">Select a brand</option>
        {brands.map(brand => (
          <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
        ))}
      </select>
    </div>
    <div>
      <label>Model:</label>
      <select value={selectedmodel} onChange={e => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
        <option value="">Select a model</option>
        {models.map(model => (
          <option key={model.codigo} value={model.codigo}>{model.nome}</option>
        ))}
      </select>
    </div>
    <div>
      <label>Year:</label>
      <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} disabled={!selectedmodel}>
        <option value="">Select a year</option>
        {years.map(h => (
          <option key={h.codigo} value={h.codigo}>{h.nome}</option>
        ))}
      </select>
    </div>
    <div>
      {vehicleData && (
        <div>
          <h2>Vehicle Data</h2>
          <p>Price: {vehicleData.Valor}</p>
          <p>Brand: {vehicleData.Marca}</p>
          <p>Model: {vehicleData.Modelo}</p>
          <p>Yar: {vehicleData.AnoModelo}</p>
          <p>Fuel: {vehicleData.Combustivel}</p>
        </div>
      )}
    </div>
  </div>
);
}

export default App;

 
  

  






