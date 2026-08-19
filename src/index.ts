import SwaggerParser from "@apidevtools/swagger-parser";

const spec = await SwaggerParser.validate("./openapi.json");

console.dir(spec, { depth: null, colors: true });
