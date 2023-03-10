import { collection_delete, collection_getAll, collection_update } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await collection_getAll();

      if (!data) return res.status(400).send("Error occured.");

      res.status(201).json(data);

      break;
    case "POST":
      const r = await collection_update(body.id, body.filed, body.value);

      if (!r) return res.status(400).send("Error occured.");

      res.status(201).json(r);

      break;
    case "DELETE":
      const result = await collection_delete(query.id);
      if (!result.success) return res.status(400).send(result.message);
      res.status(201).json(result);

      break;
    default:
      break;
  } // switch
} // handler