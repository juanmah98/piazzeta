// To parse this data:
//
//   import { Convert } from "./file";
//
//   const comandas = Convert.toComandas(json);

export interface Comandas {
    id_comanda: string;
    contenido:  string;
    estado:     boolean;
    mesa:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toComandas(json: string): Comandas[] {
        return JSON.parse(json);
    }

    public static comandasToJson(value: Comandas[]): string {
        return JSON.stringify(value);
    }
}
