const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const nog = await connection('nogs')
      .where('id', id)
      .select('name')
      .first();

    if (!nog) return response.status(400).json({
      error: 'no NOG found with this ID.'
    })

    return response.json(nog);
  }
}
