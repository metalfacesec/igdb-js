const Igdb = require('./Igdb');

class AgeRatingContentDescriptions extends Igdb {
    constructor(client_id, secret) {
        super(client_id, secret);

        this.endpoint = 'age_rating_content_descriptions';
    }
}

module.exports = AgeRatingContentDescriptions;