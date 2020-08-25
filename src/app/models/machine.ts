export interface Machine {
    power: number;
    weight: number;
    hashrate: number;
    id_client: number;

    id:string;
    model: string;
    maker: string;
    state: string;
    admission_date: string;
    discharge_date: string;
}