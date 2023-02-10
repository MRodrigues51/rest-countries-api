import { useEffect, useState } from "react"
import axios from "axios"
import { Header } from "../Components/Header";
import { HomeContainer } from "./styles";

export function Home() {

  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [region, setRegion] = useState('europe');

  useEffect(() => {
    axios(`https://restcountries.com/v2/region/${region}`)
      .then(response => response.data)
      .then(data => setCountries(data));
  }, [region]);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [countries, search]);

  return (
    <HomeContainer>
      <Header />
      <div className="container">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for a country" />
        <select value={region} onChange={e => setRegion(e.target.value)}>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      {/* <ul>
        {countries.map(country => (
          <li key={country.alpha3Code}>{country.name}</li>
        ))}
      </ul> */}
      <ul>
        {filteredCountries.map(country => (
          <li key={country.alpha3Code}>{country.name}</li>
        ))}
      </ul>
    </HomeContainer>
  )
}
