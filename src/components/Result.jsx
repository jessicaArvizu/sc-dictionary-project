import React from "react";

export default function Result(props) {
    if (props.results && props.pexelsData) {
        return (
            <div className="result-container">
                <h1 className="result-container__word">{props.results.word}</h1>
                <h2 className="result-container__phonetics">{props.results.phonetic}</h2>
                {/* Displaying SheCodes data */}
                {Array.isArray(props.results.meanings) ? (
                    props.results.meanings.map((meaning, index) => (
                        <div key={index} className="result__meaning">
                            <p className="result-container__part-of-speech">{meaning.partOfSpeech}</p>
                            <p className="result-container__definition"><span>Meaning: </span>{meaning.definition}</p>
                            {meaning.synonyms && (
                                <p className="result-container__synonyms"><span>Synonyms: </span>{meaning.synonyms.join(", ")}</p>
                            )}
                            {meaning.antonyms && (
                                <p className="result-container__antonyms"><span>Antonyms: </span>{meaning.antonyms.join(", ")}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="spinner-border text-primary" role="status"></div>
                )}
                <div className="row image-row">
                    {props.pexelsData.map((image, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                            <div className="card">
                                <img src={image.src.medium} alt={`Pexels ${index + 1}`} className="card-img-top" />
                                <div className="card-body">
                                    <p className="card-text">Photo by {image.photographer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return null;
    }
}
