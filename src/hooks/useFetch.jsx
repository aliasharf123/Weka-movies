import { useEffect, useState } from "react"

const key = process.env.NEXT_PUBLIC_DB_key

function useFetch (url) {
    
    const [data , setData] = useState({})
    const [loading , setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async (url) => {
        try {
            setLoading(true)
            const response = await fetch(url);
            const data = await response.json()
            setData(data);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
        setLoading(false);
    }
    useEffect (() => {fetchData(url+`&api_key=${key}`)} , [url])
    return { data, loading, error } ; 
}



export default useFetch;