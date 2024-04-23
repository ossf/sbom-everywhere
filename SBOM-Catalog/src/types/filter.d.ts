import {Tool} from "./tool";

export interface Filter {
    name: keyof Tool;
    enabled: boolean;
    description: string;
}