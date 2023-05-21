// To parse this data:
//
//   import { Convert, Pedidos } from "./file";
//
//   const pedidos = Convert.toPedidos(json);

import { Time } from "@angular/common";



export interface Turnos {
    id: string;
    cliente:   string;
    telefono: number;
    fecha: any;
    hora: any;
    precio: number;
    sena: number;
    observacion: string;
    edit: boolean;

}

// Converts JSON strings to/from your types
export class Convert {
    public static toPedidos(json: string): Turnos {
        return JSON.parse(json);
    }

    public static pedidosToJson(value: Turnos): string {
        return JSON.stringify(value);
    }
}
