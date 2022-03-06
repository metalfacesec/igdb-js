const axios = require('axios');

class Igdb {
    constructor(client_id, secret) {
        this.client_id = client_id;
        this.secret = secret;
        this.access_token = null;

        this.base_url = 'https://api.igdb.com/v4/';
        this.endpoint = null;

        this.categories = ['ESRB', 'PEGI', 'CERO', 'USK', 'GRAC', 'CLASS_IND', 'ACB'];
        this.ratings = [
            'Three',
            'Seven',
            'Twelve',
            'Sixteen',
            'Eighteen',
            'RP',
            'EC',
            'E',
            'E10',
            'T',
            'M',
            'AO',
            'CERO_A',
            'CERO_B',
            'CERO_C',
            'CERO_D',
            'CERO_Z',
            'USK_0',
            'USK_6',
            'USK_12',
            'USK_18',
            'GRAC_ALL',
            'GRAC_Twelve',
            'GRAC_Fifteen',
            'GRAC_Eighteen',
            'GRAC_TESTING',
            'CLASS_IND_L',
            'CLASS_IND_Ten',
            'CLASS_IND_Twelve',
            'CLASS_IND_Fourteen',
            'CLASS_IND_Sixteen',
            'CLASS_IND_Eighteen',
            'ACB_G',
            'ACB_PG',
            'ACB_M',
            'ACB_MA15',
            'ACB_R18',
            'ACB_RC',
        ]
    }

    async init() {
        try {
            this.access_token = await this.getAccessToken();
        } catch (err) {
            console.log(err);
        }
    }

    async getAccessToken() {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.secret}&grant_type=client_credentials`;
    
        let response = await axios.post(url);
    
        if (typeof response.data !== 'object' || typeof response.data.access_token !== 'string' || !response.data.access_token.length) {
            throw 'Unable to fetch access token';
        }
    
       return response.data.access_token;
    }

    getAuthHeaders() {
        return{
            'Client-ID': this.client_id,
            'Authorization': `Bearer ${this.access_token}`,
            'Content-Type': 'text/plain'
        };
    }

    async makePostRequest(fields='*', limit=100, offset=0) {
        let response = await axios.post(
            `${this.base_url}${this.endpoint}`, 
            `fields ${fields}; limit ${limit}; offset ${offset};`, 
            { headers: this.getAuthHeaders() }
        );

        console.log(response.data);
        console.log(response.status);
    }

    getAll() {
        this.makePostRequest('*', 2);
    }

    // async getPlatforms() {
    //     let offset = 0;
    //     let allPlatforms = [];
    //     let url = 'https://api.igdb.com/v4/platforms';

    //     while (true) {
    //         let response = await axios.post(url, `fields *; limit 100; offset ${offset};`, { headers: this.getAuthHeaders() });
    //         if (!Array.isArray(response.data) || !response.data.length) {
    //             break;
    //         }

    //         allPlatforms = allPlatforms.concat(response.data);

    //         offset += 100;
    //         await Utils.sleep(500);
    //     }

    //     return allPlatforms;
    // }

    // async getGamesPage(offset=0) {
    //     let url = 'https://api.igdb.com/v4/games';

    //     let response = await axios.post(url, `fields *; limit 100; offset ${offset};`, { headers: this.getAuthHeaders() });
    //     if (!Array.isArray(response.data) || !response.data.length) {
    //         return false;
    //     }

    //     return response.data;
    // }
}

module.exports = Igdb;