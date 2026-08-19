import SwaggerParser from "@apidevtools/swagger-parser";

const openapiToJson = async (path: string) => {
  const spec = await SwaggerParser.validate(path);

  return spec;
};

export default openapiToJson;
