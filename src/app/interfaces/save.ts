// To parse this data:
//
//   import { Convert, Save } from "./file";
//
//   const Save = Convert.toSave(json);



export interface Save {
    id: string;
    mesa:   number;
    pedido: string;
    time: any;
    day: string;

}

// Converts JSON strings to/from your types
export class Convert {
    public static toSave(json: string): Save {
        return JSON.parse(json);
    }

    public static SaveToJson(value: Save): string {
        return JSON.stringify(value);
    }
}
