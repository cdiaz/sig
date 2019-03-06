import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
    @Inject('dbconnection') private readonly db
  ){}

  async getRoutes() {
    const query = await this.db.query("SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id, name)) As properties FROM sebas.rutas As lg) As f) As fc")
    return await query.rows[0].row_to_json
  }

  async check(lat, long) {
    return
  }
}
