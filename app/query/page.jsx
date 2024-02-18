'use client'
import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import Questions from "@/components/Questions";

const QueryPage = () => {
    const [query, setQuery] = useState("");
    const rowsData = [
        { id: 1, title: 'Row 1', answers: ['Hello', 'Hi'], writers: ['Alice', 'Johnson'] },
        { id: 2, title: 'Row 2', answers: ['Hello', 'Hi'], writers: ['Alice', 'Johnson'] },
        { id: 3, title: 'Row 3', answers: ['Hello', 'Hi'], writers: ['Alice', 'Johnson'] },
        // Add more rows as needed
    ];
    const [questions,setQuestions] = useState(rowsData)
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(()=>{
        const getQuestions = async () => {
            try{
                setQuery(searchParams.get('ask'));
                const searchstring = searchParams.get('ask')
                const response = await fetch(`http://127.0.0.1:5000/retreival?query=${searchstring}`);
                const [data,statuscode] = await response.json();
                if (statuscode === 200) {
                    console.log(data)
                    setQuestions(data['data'])
                } else {
                    console.error(`Unexpected status code: ${statuscode}`);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getQuestions()
    },[])

    const handlenewSearch = async () => {
        try {
            const searchstring = query;
            const response = await fetch(`http://127.0.0.1:5000/retreival?query=${searchstring}`)
            const [data, statuscode] = await response.json();
            if (statuscode === 200) {
                setQuestions(data['data'])
            }
            else {
                console.error(`Unexpected status code ${statuscode}`)
            }
        } catch (error) {
            console.log(error)   
        }
    }
  return (
    <div className="w-full h-full items-start">
          <section className="flex flex-col lg:flex-row mt-5 items-start">
            <input
                className="form_input text-left border-solid border-2 rounded-sm border-black mr-5"
                value={query}
                placeholder="Enter your query"
                onChange={(e) => { setQuery(e.target.value) }}
            />
            <button
                type="button"
                className="black_btn mt-5 text-lg"
                onClick={handlenewSearch}
            >
                Search
            </button>
          </section>
          <section className="flex flex-col w-full mt-5">
            <Questions questions={questions}/>
          </section>
    </div>
  )
}

export default QueryPage