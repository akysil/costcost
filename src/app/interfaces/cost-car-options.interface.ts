export interface CostCarOptions {
    speed?: CostCarOptionsSpeed,
    rating?: CostCarOptionsRating,
    tmv?: number,
    tco?: number,
    warranty?: any
}

export interface CostCarOptionsSpeed {
    horsepower?: number
}

export interface CostCarOptionsRating {
    consumer?: number
}