// To parse this data:
//
//   import { Convert, Clave } from "./file";
//
//   const clave = Convert.toClave(json);

export interface Clave {
    id: string;
    clave: string;
    email: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClave(json: string): Clave {
        return JSON.parse(json);
    }

    public static claveToJson(value: Clave): string {
        return JSON.stringify(value);
    }
}
