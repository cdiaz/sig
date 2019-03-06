import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
    @Inject('dbconnection') private readonly db
  ){}

  async getRoutes() {
    const query = await this.db.query(
      "SELECT row_to_json ( fc )" +
      "FROM (" +
      "	SELECT" +
      "		'FeatureCollection' AS TYPE," +
      "		array_to_json (" +
      "		ARRAY_AGG ( f )) AS features" +
      " FROM (" +
      "		SELECT" +
      "			'Feature' AS TYPE," +
      "			ST_AsGeoJSON ( lg.geom ) :: json AS geometry," +
      "			row_to_json ((ID,	NAME)) AS properties " +
      "   FROM sebas.rutas AS lg) AS f) AS fc"
    )
    return await query.rows[0].row_to_json
  }

  async check(lat, long) {
    const query = await this.db.query(
      "SELECT id, name,\n" +
      "	CAST ( st_distance_sphere (geom, st_setsrid (st_makepoint ($1, $2), 4326)) AS INT) AS d \n" +
      "FROM\n" +
      "	sebas.rutas \n" +
      "ORDER BY\n" +
      "	geom <-> st_setsrid (st_makepoint ($1, $2), 4326) \n" +
      "LIMIT 1;", [long, lat])
    return await query.rows[0]
  }
}
