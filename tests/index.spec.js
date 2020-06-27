import dataFunctions from "../server/functions/getData.js";
import request from "supertest";
import app from "../server/app";

jest.mock('../server/functions/getData.js', () => {
    return {
        countryList: jest.fn().mockResolvedValue({countries: ['United States']}),
        getMdDates: jest.fn().mockResolvedValue(['4-16-2020']), 
        getMdData: jest.fn().mockResolvedValue([1]),
        getMdDeltas: jest.fn().mockResolvedValue([2])
    }
});

describe('get default endpoint /api', () => {
    it('should return a key value pair', async () => {
        const res = await request(app).get('/api');
        expect(res.statusCode).toEqual(200)
        expect(JSON.stringify(res.body)).toBe(JSON.stringify({ Key: 'This is a test' }));
    });
});

describe('get data endpoints', () => {
    it('get Maryland Dates returns the result of dataFunctions.getMdDates', async () => {
        const res = await request(app).get('/api/MarylandDates');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify(['4-16-2020']));
    });

    it('get Maryland Dates returns the result of dataFunctions.getMdData', async () => {
        const res = await request(app).get('/api/MarylandData');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([1]));
    });

    it('get Maryland Dates returns the result of dataFunctions.getMdDeltas', async () => {
        const res = await request(app).get('/api/MarylandDeltas');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([2]));
    });

})


