const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('nogs', 'nogs.id', '=', 'incidents.nog_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*')
      .select([
        'incidents.*',
        'nogs.name',
        'nogs.email',
        'nogs.whatsapp',
        'nogs.city',
        'nogs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;

    const nog_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      nog_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const nog_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('nog_id')
      .first();

    if (incident.nog_id !== nog_id) return response.status(401).json({
      error: 'Operation not permitted.'
    });

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}
