/*
Mapping algorithm to get the raw data into the different Plots.
 */

import {Filter} from "../types/filter";
import {Tool} from "../types/tool";
import {Tree} from "../types/tree";

export function generateTreeObject(filters: Filter[], tools: Tool[]): Tree {
    const enabledFilters: Filter[] = filters.filter(filter => filter.enabled);
    return {
        name: 'Landscape',
        value: 0,
        children: generateTreeObjectInternal(enabledFilters, tools)
    }
}

function generateTreeObjectInternal(filters: Filter[], tools: Tool[]): Tree[] {
    let result: Tree[] = []
    let currentFilter: Filter
    let remainingFilters: Filter[] = filters

    // only use enabled filters
    do {
        if (remainingFilters.length === 0) {
            return []
        }
        currentFilter = remainingFilters[0]
        remainingFilters = remainingFilters.slice(1)
    } while (!currentFilter.enabled)

    let distinctAttributes = retrieveDistinctAttributes(currentFilter, tools)

    for (let item of distinctAttributes) {
        // if you remove that filters that are null are bypassed in the tree, so they are also displayed to the end.
        if (item == null) continue;

        let entry: Tree = {
            name: item,
            value: 1,
            children: []
        }

        if (remainingFilters.length !== 0) {
            let subdata: Tool[] = filterAttributes(currentFilter, tools, item)
            entry.children = generateTreeObjectInternal(remainingFilters, subdata)
        }

        result.push(entry)
    }

    return result;
}

function filterAttributes(currentFilterPointer: Filter, tools: Tool[], currentFilter: String): Tool[] {
    let values: Tool[] = []

    for (let item of tools) {
        let attributeValue: string
        if (Array.isArray(item[currentFilterPointer.name])){
            attributeValue = (item[currentFilterPointer.name] as Array<string>).join("-")
        } else {
            attributeValue = item[currentFilterPointer.name] as string
        }

        if (attributeValue === currentFilter) {
            values.push(item)
        }
    }

    return values;
}

function retrieveDistinctAttributes(currentFilter: Filter, tools: Tool[]):Set<string> {
    let distinctValues: Set<string> = new Set<string>()

    for (let item of tools) {
        let attributeName: keyof Tool = currentFilter.name
        let attributeValue: string

        if (Array.isArray(item[attributeName])){
            attributeValue = (item[attributeName] as Array<string>).join("-")
        } else {
            attributeValue = item[attributeName] as string
        }

        distinctValues.add(attributeValue)
    }

    return distinctValues;
}

/*
Normalise algorithm to get the data into the different Plots.
 */
export function normaliseList(tools: Tool[]): Tool[] {
    let result: Tool[] = []
    let finishflag: boolean = true

    for (let entry of tools) {
        let noArray: boolean = true
        for (let key in entry) {
            if (Array.isArray(entry[key as keyof Tool])) {
                let itemList: string[] = entry[key as keyof Tool] as string[]
                if (itemList.length != 1) {
                    noArray = false
                    for (let item of itemList) {
                        let clone: Tool = deepClone(entry)

                        // @ts-ignore
                        // This could only be checked at runtime. TypeScript works only up to Build Time
                        // Basically i have to pull a "trust me bro" here.
                        // This will be fine as long as Tool only contains Strings and Arrays of Strings
                        clone[key as keyof Tool] = [item]
                        result.push(clone)
                    }
                    finishflag = false
                }
            }
        }

        if (noArray) {
            result.push(deepClone(entry))
        }
    }

    if (!finishflag) {
        return normaliseList(result)
    }

    console.log(result)
    return result;
}

/*
Aggregation algorithm to get the data into the different Plots.
 */
export function aggregateList(tools: Tool[]): Tool[] {
    for (let entry of tools) {
        for (let key in entry) {
            if (entry[key as keyof Tool] instanceof Array) {
                let itemList: string[] = entry[key as keyof Tool] as string[]

                // @ts-ignore
                // This could only be checked at runtime. TypeScript works only up to Build Time
                // Basically i have to pull a "trust me bro" here.
                // This will be fine as long as Tool only contains Strings and Arrays of Strings
                entry[key as keyof Tool] = [itemList.join('-')]
            }
        }
    }

    return tools;
}

/*
A Function that can deep clone every object and return the same type in TypeScript
 */
export function deepClone<T> (arg: T): T {
    return JSON.parse(JSON.stringify(arg));
}