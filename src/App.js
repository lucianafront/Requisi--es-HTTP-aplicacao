import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]); // Estado para armazenar os anos
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the brands!", error);
      });
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos`)
        .then(response => {
          setModels(response.data.modelos);
        })
        .catch(error => {
          console.error("There was an error fetching the models!", error);
        });
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos`)
        .then(response => {
          setYears(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the years!", error);
        });
    }
  }, [selectedModel, selectedBrand]);

  useEffect(() => {
    if (selectedYear && selectedModel && selectedBrand ) {
      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`)
        .then(response => {
          setVehicleData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the vehicle data!", error);
        });
    }
  }, [selectedYear, selectedModel, selectedBrand]);

  return (
    <div>
      <h1>Busca por Veículos</h1>
      <div className='form-floating'>
       
        <select className='form-select' value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
          <option value="">Select a brand</option>
          {brands.map(brand => (
            <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
          ))}
        </select>
        <label>Brand:</label>
      </div>
      <div className='form-floating'>
       
        <select className='form-select' value={selectedModel} onChange={e => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
          <option value="">Select a model</option>
          {models.map(model => (
            <option key={model.codigo} value={model.codigo}>{model.nome}</option>
          ))}
        </select>
        <label>Model:</label>
      </div>
      <div className='form-floating'>
      
        <select className='form-select' value={selectedYear} onChange={e => setSelectedYear(e.target.value)} disabled={!selectedModel}>
          <option value="">Select a year</option>
          {years.map(year => (
            <option key={year.codigo} value={year.codigo}>{year.nome}</option>
          ))}
        </select>
        <label>Year:</label>
      </div>
      <div>
        {vehicleData && (
          <div>
            <h2>Vehicle Data</h2>
            <p>Price: {vehicleData.Valor}</p>
            <p>Brand: {vehicleData.Marca}</p>
            <p>Model: {vehicleData.Modelo}</p>
            <p>Year: {vehicleData.AnoModelo}</p>
            <p>Fuel: {vehicleData.Combustivel}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;






 
  

  






