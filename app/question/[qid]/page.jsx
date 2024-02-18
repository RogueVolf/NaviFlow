'use client'
import { useEffect, useState } from 'react'

const SingleQuestion = ({params}) => {
    const qid = params?.qid;
    const rowsData = [
        { id: 1, question: 'Row 1', 'answers': ['Hello', 'Hi'], 'writer': ['Alice', 'Johnson'] },
        // Add more rows as needed
    ];
    const [questions, setQuestions] = useState(rowsData[0])
    const [answer,setAnswer] = useState("");
    const [username,setUsername] = useState("");
    
    const getQuestions = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/query/${qid}`)
            const [data, statuscode] = await response.json();
            if (statuscode === 200) {
                console.log(data['data'])
                setQuestions(data['data'])
            }
            else {
                console.error(`Unexpected status code ${statuscode}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{

        getQuestions();
    },[])

    const addAnswer = async () => {
        try {
            const data = {
                'id': qid,
                'answer': answer,
                'username' : username
            }
            const response = await fetch(`http://127.0.0.1:5000/add`,
            {
                'method' : 'POST',
                'headers':{
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(data)
            })

            const [status,statuscode] = await response.json();
            if (statuscode === 201)
            {
                console.log(status['success']);
                setAnswer("");
                setUsername("");
                getQuestions();
            }
            else
            {
                console.error(`Unexpected status code ${statuscode}`)
            }
        } catch (error) {
            console.log(error)   
        }
    }
    return (
    <div className='flex flex-col justify-items-start'>
        <div className='rounded-md border-solid border-2 border-black p-5 mt-5'>
            <h1 className='head_text'>{questions['question']}</h1>
        </div>
        <div className="pr-5 pl-7 pb-5">
            <div className="rounded-lg p-5">
                {questions['answers'].map((answer, index) => (
                    <div className="bg-gray-300 rounded-md mb-3 p-2">
                        <p className="font-inter font-bold text-sm text-gray-500">{answer}</p>
                        <p className="font-inter text-sm text-gray-500 text-right">{questions['writer'][index]}</p>
                    </div>
                ))}

            </div>
        </div>
        <div className='w-full'>
            <section className="flex flex-col mt-5 justify-center place-items-center">
                <textarea
                    className="form_input text-left border-solid border-2 rounded-sm border-black"
                    value={answer}
                    placeholder="Enter your Answer"
                    onChange={(e) => { setAnswer(e.target.value) }}
                />
                <div className='w-full flex justify-end mt-5'>
                    <div className='flex-col'>
                        <input
                            className='form_input text-left border-solid border-2 rounded-sm border-black'
                            value={username}
                            placeholder='Enter your username'
                            onChange={(e)=>{setUsername(e.target.value)}}
                        />
                        <button
                            type="button"
                            className="black_btn mt-5 text-lg ml-auto"
                            onClick={addAnswer}
                        >
                            Add Answer
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default SingleQuestion