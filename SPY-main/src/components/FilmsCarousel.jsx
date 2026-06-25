"use client";
import React from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CCarousel, CCarouselItem } from "@coreui/react";
import filmsData from "../data/films.json";

export default function FilmsCarousel() {
    const films = filmsData;

    // Helpful debug: log when the React component mounts in the browser
    React.useEffect(() => {
        console.log('FilmsCarousel mounted');
    }, []);

    return (
        <div className=" md:w-1/2 max-w-5xl mx-auto border-2 border-red-500/40 p-4 rounded">
            <CCarousel controls indicators className="w-full">
                {films.map((film) => (
                    <CCarouselItem key={film.number}>
                        <div className="p-6 bg-gray-900 rounded-xl min-h-96 flex flex-col items-center justify-end">
                            <div className="text-yellow-400 text-sm font-mono mb-2">{film.number}</div>
                            <h4 className="text-lg font-bold mb-3 text-white">{film.title}</h4>
                            <p className="text-gray-400 text-sm italic">"{film.tagline}"</p>
                        </div>
                    </CCarouselItem>
                ))}
            </CCarousel>


        </div>
    );
}
