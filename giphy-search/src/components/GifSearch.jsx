import API_KEY from "../config" //import API_KEY to hide it and prevent other code to affect it 
import { handleFetch } from "../utils" // import handleFetch for fetch 
import { useEffect, useState } from "react" // import hooks from React
import GifContainer from "./GifContainer" // import GifContainer for props drilling 


function GifSearch() {
    const [query, setQuery] = useState(""); // hook for query, which is the search results from the form
    const [gifs, setGifs] = useState([]); // hook for gifs, which is from the trending URL fetch and query form fetch in order render on webpage
    const [error, setError] = useState(null); // hook for errors, which can come from the fetches

    const trending = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3&rating=g`; // Backticks for template literals

    useEffect(() => {
        const fetchTrending = async () => {
            const [data, error] = await handleFetch(trending)
            if (data) setGifs(data.data);
            if (error) setError(error)
                // console.log(data)
                // console.log(data.data)
            }
        fetchTrending()
    }, [])
    
    const fetchSearch = async () => {
        const search = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=3&rating=g
` // URL path for search
        const [data, error] = await handleFetch(search)
        if (data) setGifs(data.data);
        if (error) setError(error)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearch()
    }

    const handleSearch = (e) => setQuery(e.target.value)

    console.log(gifs)
    console.log(query)

    if (error) {
        return (
            <div> Error: {error.message}</div>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchInput">Enter a Search Term </label>
                <input type="text" className="form-control" id="searchInput" value={query} onChange={handleSearch}/>
                <button type="submit" className="btn btn-success">Search</button>
            </form>
            <GifContainer gifs={gifs}/>
        </div>
    )
}

export default GifSearch
