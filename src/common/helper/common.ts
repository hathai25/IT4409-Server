import { ValidationError } from "class-validator";

function parseErrors(errorMessages, parentProperty, vError) {
    if (vError.constraints) {
      errorMessages.push({
        field: `${parentProperty}`,
        error: Object.values(vError.constraints).join(', '),
      });
    } else if (vError.children && vError.children.length > 0) {
      let i = 0;
      for (const c of vError.children) {
        parseErrors(errorMessages, `${parentProperty}.${i}`, c);
        i++;
      }
    }
  }
  
  export const parseValidateErrors = (
    validationErrors: ValidationError[] = [],
  ) => {
    const errorMessages: { field: string; error: string }[] = [];
    for (const vError of validationErrors) {
      parseErrors(errorMessages, vError.property, vError);
    }
    return errorMessages;
  };