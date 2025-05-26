import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { describe, beforeAll, it, expect } from 'vitest';

describe('YAML Data Uniqueness', () => {
    let data;

    beforeAll(() => {
        // Load the YAML file before running tests
        try {
            const yamlPath = path.resolve('./public/data.yaml');
            const fileContents = fs.readFileSync(yamlPath, 'utf8');
            data = yaml.load(fileContents);
        } catch (e) {
            console.error('Error loading YAML file:', e);
            throw e; // Re-throw to fail the test setup
        }
    });

    it('should have unique "name" fields across all objects', () => {
        // Ensure data is an array and filter out invalid entries
        const uniqueNames = new Set();
        console.log(typeof(data));
        for (const obj of data) {
            if (uniqueNames.has(obj.Name)) {
                console.log('Duplicate name found:', obj.Name);
            }
            uniqueNames.add(obj.Name);
        }

        // If there are duplicates, the size of the Set will be less than the original array length
        expect(data.length).toBe(uniqueNames.size);
    });
});