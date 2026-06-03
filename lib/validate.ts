import { ZodSchema } from "zod";

type ValidateResult<T> =
  | { success: true; data: T }
  | { success: false; error: any };

export async function validateBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<ValidateResult<T>> {
  try {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      error: new Error("Invalid JSON body"),
    };
  }
}