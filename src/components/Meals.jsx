import React,{useEffect, useState} from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const RequestConfig = {};

export default function Meals() {
// const [fetchedMealsData, setMealsData] = useState([]);

    // useEffect(() => {
    //   async function fetchmeals(){
    //      const response = await fetch('http://localhost:3000/meals');
    //      const meals = await response.json();
    //      setMealsData(meals);
         
    //      if(!response.ok){
    //         //do something
    //      }
    //   }
    //   fetchmeals();
    // }, []);

     const {data: fetchedMealsData, isLoading, error} = useHttp('http://localhost:3000/meals', RequestConfig, [])
     
     if(isLoading){
        return <p className='center'>Data is Fetching please wait...</p>
     }

     if(error){
       return <Error title='Failed to fetch meals' message={error}/>
     }
     
    return (
    <ul id='meals'>
        {fetchedMealsData &&
        fetchedMealsData.map((meal)=>(
            <MealItem key={meal.id} meal={meal}/>
        ))}
    </ul>
  )
}
