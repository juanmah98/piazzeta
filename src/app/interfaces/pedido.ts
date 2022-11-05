// To parse this data:
//
//   import { Convert, Pedidos } from "./file";
//
//   const pedidos = Convert.toPedidos(json);



export interface Pedidos {
    id: string;
    mesa:   number;
    pedido: string;
    time: any

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
