import React, { useEffect, useState } from "react";
import axios from "axios";
import Result from "./Result";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [pexelsData, setPexelsData] = useState(null);

    useEffect(() => {
        if (!formSubmitted || keyword.trim() === "") {
            return;
        }

        const apiKey = 'd09a0fd0aaod658935ba4280ebb33t01';
        const pexelsKey = 'Orgy9SRYIQOwwx3agcmbo1SiGYnnaLSnCiOFSWOmPy1a9AxNm25i57Ji';
        const baseUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
        const pexelsBaseUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=6`;

        // SheCodes API call
        axios.get(baseUrl)
            .then(response => {
                console.log(response.data);
                const meanings = response.data.meanings.map(meaning => ({
                    definition: meaning.definition,
                    partOfSpeech: meaning.partOfSpeech,
                    example: meaning.example,
                    synonyms: meaning.synonyms,
                    antonyms: meaning.antonyms,
                }));

                setResults({
                    ready: true,
                    word: response.data.word,
                    phonetic: response.data.phonetic,
                    meanings: meanings,
                });
            })
            .catch(error => {
                console.error('Error fetching SheCodes data:', error);
            });

        // Pexels API call
        axios.get(pexelsBaseUrl, { headers: { Authorization: pexelsKey } })
            .then(response => {
                console.log(response.data);
                if (response.data.photos && response.data.photos.length > 0) {
                    setPexelsData(response.data.photos.slice(0, 6));
                }
            })
            .catch(error => {
                console.error('Error fetching Pexels data:', error);
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
            {formSubmitted && <Result results={results} pexelsData={pexelsData} />}
        </div>
    )
}
