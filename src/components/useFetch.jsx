import { useEffect, useState } from "react";

//handle fetching data from a given url
export default function useFetch(url) { 
    const [data, setData] = useState(null); //hold the fetched data
    const [isLoading, setIsLoading] = useState(true); //used to indicate whether data is currently being fetched (loading state).
    const [error, setError] = useState(null); //store any error that might occur during the fetch operation.

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal }) //Initiates a fetch request to the specified url with the signal from the AbortController to allow for potential abortion of the request.

            .then(response => {
                if(!response.ok) {
                    throw Error('Could not fetch for that resource');
                }
                return response.json();
            })
            .then(data => { //based on successful response
                setData(data); //update the state variable (data) with the fetched data and store the retrieved data in the component's state for further use.
                setIsLoading(false); //omponent is no longer in a loading state.
                setError(null); // ensures that any previous error state (from a previous fetch attempt or an initial error state) is cleared
            })
            .catch(err => {
                if (err.name === 'AbortError') { // means the fetch operation was intentionally aborted (e.g., due to component unmount),
                    console.log('fetch aborted')
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            })

            return () => abortCont.abort();
        }, [url]); //The useEffect has a dependency array [url], which means the effect will be re-run if the url changes. This is useful for re-fetching data when the url prop or state variable changes.

        return { data, isLoading, error } // returns an object with the current state values (data, isLoading, error). This allows the component using this hook to access the latest state values and use them as needed.

}

// useEffect template: (for fetching API)

// useEffect(() => {
//     const abortController = new AbortController();
  
//     fetch('https://api.example.com/data', { signal: abortController.signal })
//       .then(response => response.json())
//       .then(data => {
//         // Process the data
//       })
//       .catch(error => {
//         // Handle errors
//       });
  
//     return () => {
//       // Cleanup: Abort the fetch request when the component unmounts
//       abortController.abort();
//     };
//   }, []);
  
//In the context of the provided useFetch example, the pattern of setting setData(data) and setIsLoading(false) while keeping setError(null) is a common approach to manage state in a way that reflects the success or failure of an asynchronous operation (like a data fetch).

