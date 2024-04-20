export interface Tool {
    Name: string;
    Link: string;
    Publisher: string;
    License: string;
    Standards: Array<string>;
    Abilities: Array<string>;
    Type?: Array<string>;
    Language?: Array<string>;
};