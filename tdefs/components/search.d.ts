/// <reference types="react" />
export declare type SearchResult = {
    name: string;
    url: string;
    desc: string;
    keywords: string;
    id: number | undefined;
};
export declare const searchBar: () => JSX.Element;
