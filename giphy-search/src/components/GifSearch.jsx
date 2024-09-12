import API_KEY from "../config" //import API_KEY to hide it and prevent other code to affect it 
import { handleFetch } from "../utils" // import handleFetch for fetch 
import { useEffect, useState } from "react" // import hooks from React
import GifContainer from "./GifContainer" // import GifContainer for props drilling 


function GifSearch() {
    const [query, setQuery] = useState(""); // hook for query, which is the search results from the form
    const [gifs, setGifs] = useState([]); // hook for gifs, which is from the trending URL fetch and query form fetch in order render on webpage
    const [error, setError] = useState(null); // hook for errors, which can come from the fetches

    const trending = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3&rating=g`; // URL for trending fetch, backticks and template literals 

    useEffect(() => { // useEffect for the initial page render
        const fetchTrending = async () => { // function to handle async, can't make the initial useEffect callback an async function
            const [data, error] = await handleFetch(trending) // tuple to store the responses/promises after the fetch
            if (data) setGifs(data.data); // if there is data, set the gifs to the array in the endpoint data
            if (error) setError(error) // if there is an error, set error
            }
        fetchTrending() // invoke the fetchTrending function because it is asynchronous
    }, []) // dependency array is blank because only need to render once on page start
    
    const fetchSearch = async () => { // function to handle fetch of the search form
        const search = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=3&rating=g
` // URL path for search fetch, backticks and template literals
        const [data, error] = await handleFetch(search) // tuple to store the responses/promises after the fetch
        if (data) setGifs(data.data); // if there is data, set the gifs to the array in the endpoint data
        if (error) setError(error) // if there is an error, set error
    }

    const handleSubmit = (e) => { // callback function for handling form event
        e.preventDefault(); // resets the form/input box
        fetchSearch() // invokes the fetchSearch function because it is asynchronous
    }

    const handleSearch = (e) => setQuery(e.target.value) // callback function to handle updating the query, set query to the event value received 

    if (error) { // if error
        return (
            <div> Error: {error.message}</div> // return this message instead of the normal return function 
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}> {/* no idea what the onSubmit is for, but it's in the notes */}
                <label htmlFor="searchInput">Enter a Search Term </label>
                <input type="text" className="form-control" id="searchInput" value={query} onChange={handleSearch}/> {/* also got no idea on the logic/reasoning behind value and onChange props, but it's in the notes*/}
                <button type="submit" className="btn btn-success">Search</button>
            </form>
            <GifContainer gifs={gifs}/>
        </div>
    )
}

export default GifSearch
