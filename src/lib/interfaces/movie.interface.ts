export interface MovieI {
    page: number;
    results: Movie[];
    total_pages: number;
    total_resutls: number;
}

export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    id: number;
};

export type MovieDetail = {
    adult: boolean;
    backdrop_path: string | null;
    release_date: string;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    title: string;
    original_language: string;
    origina_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompanies[];
    status: string;
    tagline: string | null;
    vote_average: number;
    vote_count: number;
};

type Genre = {
    id: number;
    name: string;
};

type ProductionCompanies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};
