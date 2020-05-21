const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const nog_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('nog_id', nog_id)
      .select('*');

    return response.json(incidents);
  }
}
