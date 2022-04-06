export interface Security{
    desc :  string ,
    key : number,
    symbol :  string ,
    basePrice : number,
    lastPrice : number,
    low : number,
    high : number
}

export interface StockDataDTO{
    chart :  ChartData[];
    stock : Security;
    realTime: Realtime; 
}

export interface ChartData{
    time :  Date,
    open : number,
    min : number,
    max : number
}

export interface Realtime{
    lastPrice:number,
    hight:number,
    low:number,
}