import Cors from "cors";
import runMiddleware from "../../src/api/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  //   methods: ['GET', 'HEAD'],
});


async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  res.json({ 
    message: "data with cors", 
  });
}

export default handler;
