import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setisPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const abortCont = new AbortController();

      setTimeout(() => {
        fetch(url, {signal: abortCont.signal })
          .then(response => {
            console.log(response)
            if (!response.ok) { // error comes from server
              throw Error('could not fetch the data for that resource!')
            }
            return response.json();
          })

          .then(data => {
            setisPending(false)
            setData(data);
            setError(null)
          })

          .catch(error => {
            // autocatch network / connection error
            if (error.name === "AbortError") {
              console.log('fetch aborted')
            } else {
              setisPending(false)
              setError(error.message)
            }

          })
      }, 300)

      return () => abortCont.abort()
    }, [url])

    return ({ data, isPending, error});
}

export default useFetch;