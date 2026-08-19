import { z, ZodType } from "zod";

// Recursively create a zod schema from input
const jsonSchemaToZod = (schema: any): ZodType => {
  if (!schema) return z.any();

  if (schema.enum) {
    return z.enum(schema.enum as [string, ...string[]]);
  }

  switch (schema.type) {
    case "string": {
      let s = z.string();
      if (schema.format === "email") s = s.email();
      if (schema.format === "date-time") s = s.datetime({ offset: true });
      if (schema.minLength !== undefined) s = s.min(schema.minLength);
      if (schema.maxLength !== undefined) s = s.max(schema.maxLength);
      return applyNullable(s, schema);
    }

    case "integer":
    case "number": {
      let n = z.number();
      if (schema.type === "integer") n = n.int();
      if (schema.minimum !== undefined) n = n.min(schema.minimum);
      if (schema.maximum !== undefined) n = n.max(schema.maximum);
      return applyNullable(n, schema);
    }

    case "boolean":
      return applyNullable(z.boolean(), schema);

    case "array": {
      const itemSchema = jsonSchemaToZod(schema.items);
      return applyNullable(z.array(itemSchema), schema);
    }

    case "object": {
      const shape: Record<string, ZodType> = {};
      const required: string[] = schema.required ?? [];
      const properties = schema.properties ?? {};

      for (const [key, propSchema] of Object.entries<any>(properties)) {
        const propZod = jsonSchemaToZod(propSchema);
        shape[key] = required.includes(key) ? propZod : propZod.optional();
      }

      let obj = z.object(shape);
      return applyNullable(obj.passthrough(), schema);
    }

    default:
      return z.any();
  }
};

// Make nullable parameters nullable
const applyNullable = (zodType: ZodType, schema: any): ZodType => {
  return schema.nullable ? zodType.nullable() : zodType;
};

export default jsonSchemaToZod;
