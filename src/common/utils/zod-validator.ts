import { z } from "zod";
import HttpError from "http-errors";

export default async function zodValidator<
  DataSchema extends z.ZodObject<any, any>
>(dataSchema: DataSchema, data: any): Promise<z.infer<DataSchema>> {
  try {
    const validatedData: z.infer<DataSchema> = await dataSchema.parseAsync(
      data
    );

    return validatedData;
  } catch (error) {
    const errorMessage = (error as Error).message;
    let em = errorMessage || "Validation Error";

    try {
      // try to parse the error message
      const parsedError = JSON.parse(errorMessage);
      const firstError = parsedError[0];
      em = `Validation error in ${firstError.path} says ${firstError.message}`;
    } catch (_) {}

    throw new HttpError.BadRequest(em);
  }
}
