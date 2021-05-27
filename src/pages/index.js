import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import CountrieTable from '../components/CountrieTable/CountrieTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

export default function Home({countries}) {
  // console.log(countries);

  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter((country)=>
  country.name.toLowerCase().includes(keyword) ||
  country.region.toLowerCase().includes(keyword) ||
  country.subregion.toLowerCase().includes(keyword))

  const onInputChange = (e)=>{
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  }
  return (
   <Layout>
     <div className={styles.input_container}>
       <div className={styles.counts}>Found {countries.length} countries</div>
       <SearchInput placeholder="Filter by Name, Region or SubRegion" onChange={onInputChange}/>
     </div>
     

    <CountrieTable countries={filteredCountries} />
   </Layout>
  )
}

//getStaticProps is a function made available by next.js which
//allows us to pass props at build time. It'll refresh every time we build
//the app
export const getStaticProps = async ()=>{
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json()
  return{
    props:{
      countries
    }
  }
}