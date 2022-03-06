const Igdb = require('./Igdb');

class AgeRating extends Igdb {
    constructor(client_id, secret) {
        super(client_id, secret);

        this.endpoint = 'age_ratings';
    }
}

module.exports = AgeRating;