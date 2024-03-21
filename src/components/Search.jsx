import React, { useEffect, useState } from "react";
import axios from "axios";
import Result from "./Result";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (!formSubmitted || keyword.trim() === "") {
            return;
        }

        const apiKey = 'd09a0fd0aaod658935ba4280ebb33t01';
        const baseUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

        setLoading(true);

        axios.get(baseUrl)
            .then(response => {
                const meanings = response.data.meanings.map(meaning => ({
                    definition: meaning.definition,
                    partOfSpeech: meaning.partOfSpeech,
                    example: meaning.example
                }));

                setResults({
                    ready: true,
                    word: response.data.word,
                    phonetic: response.data.phonetic,
                    meanings: meanings, // Set all meanings here
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [keyword, formSubmitted]);

    function handleSearch(e) {
        e.preventDefault();
        setFormSubmitted(true);
    }

    function handleWordChange(e) {
        setKeyword(e.target.value);
    }

    return (
        <div>
            <form id="search-form" className="search-form" onSubmit={handleSearch}>
                <div className="row g-2">
                    <div className="col-sm-8">
                        <input
                            id="search-form-input"
                            type="search"
                            placeholder="What would you like to search?"
                            required
                            className="search-form__input"
                            name="word"
                            onChange={handleWordChange}
                        />
                    </div>
                    <div className="col-sm-4">
                        <button type="submit" className="btn search-form__button">Search</button>
                    </div>
                </div>
            </form>
            {formSubmitted && <Result results={results} />}
        </div>
    )
}
