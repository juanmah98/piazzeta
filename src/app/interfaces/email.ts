// To parse this data:
//
//   import { Convert, Clave } from "./file";
//
//   const clave = Convert.toClave(json);

export interface EmailStorage {
    id: string;
    email: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClave(json: string): EmailStorage {
        return JSON.parse(json);
    }

    public static claveToJson(value: EmailStorage): string {
        return JSON.stringify(value);
    }
}
