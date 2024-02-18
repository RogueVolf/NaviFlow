'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/query?ask=${query}`)
    }
    return (
    <div className="w-full h-full flex-col mt-5">
        <section className="flex flex-center">
            <h1 className="head_text text-center">
                Share & Learn
                <br className="max-md:hidden" />
                <span className="blue_gradient text-center">
                    A Company Stack Overflow
                </span>
                <p className="desc text-center">
                    An open platform for colleagues to share knowledge, tips and tricks with each other
                </p>
            </h1>
        </section>
        <section className="flex flex-col mt-5 justify-center place-items-center">
            <input
            className="form_input text-center border-solid border-2 rounded-sm border-black"
            value={query}
            placeholder="Enter your query"
            onChange={(e) => {setQuery(e.target.value)}}
            />
            <button
                type="button"
                className="black_btn mt-5 text-lg"
                onClick={handleSearch}
            >
                Answer
            </button>
        </section>
    </div>
  )
}

export default Home