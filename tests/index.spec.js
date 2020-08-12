import request from "supertest";
import app from "../server/app";

jest.mock('../server/functions/getData.js', () => {
    return {
        countryList: jest.fn().mockResolvedValue([{country: 'United States'}]),
        stateList: jest.fn().mockResolvedValue([{id: "1", state: 'Maryland'}]),
        getDates: jest.fn().mockResolvedValue(['4-16-2020']),
        getData: jest.fn().mockResolvedValue([1]),
        getDeltas: jest.fn().mockResolvedValue([2]),
        getDonutData: jest.fn().mockResolvedValue([1, 2, 3])
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
    it('get country list returns the result of countryList', async () => {
        const res = await request(app).get('/api/countryList');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([{country: 'United States'}]));
    });

    it('get state list returns the result of stateList', async () => {
        const res = await request(app).get('/api/stateList');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([{id: "1", state: 'Maryland'}]));
    });

    it('get Maryland Dates returns the result of dataFunctions.getDates(Maryland)', async () => {
        const res = await request(app).get('/api/dates/Maryland');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify(['4-16-2020']));
    });

    it('get Maryland data returns the result of dataFunctions.getData(Maryland)', async () => {
        const res = await request(app).get('/api/data/Maryland');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([1]));
    });

    it('get Maryland Dates returns the result of dataFunctions.getDeltas(Maryland)', async () => {
        const res = await request(app).get('/api/deltas/Maryland');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([2]));
    });

    it('get Maryland Donut Data returns the result of dataFunctions.getDonutData(Maryland)', async () => {
        const res = await request(app).get('/api/donutData/Maryland');
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(3);
        expect(JSON.stringify(res.body)).toBe(JSON.stringify([1, 2, 3]));
    });

})


