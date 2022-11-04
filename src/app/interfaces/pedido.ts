// To parse this data:
//
//   import { Convert, Pedidos } from "./file";
//
//   const pedidos = Convert.toPedidos(json);

import { Time } from "@angular/common";

export interface Pedidos {
    id: string;
    mesa:   number;
    pedido: string;

}

// Converts JSON strings to/from your types
export class Convert {
    public static toPedidos(json: string): Pedidos {
        return JSON.parse(json);
    }

    public static pedidosToJson(value: Pedidos): string {
        return JSON.stringify(value);
    }
}
