export interface CostCarOptions {
    speed?: CostCarOptionsSpeed,
    rating?: CostCarOptionsRating,
    tmv?: number,
    tco?: number,
    warranty?: CostCarOptionsWarranty,
    engine?: CostCarOptionsEngine,
    transmission?: CostCarOptionsTransmission,
    offRoad?: CostCarOptionsOffRoad,
    roominess?: CostCarOptionsRoominess,
    comfort?: CostCarOptionsComfort,
    safety?: CostCarOptionsSafety
}

export interface CostCarOptionsSpeed {
    horsepower?: number
}

export interface CostCarOptionsRating {
    consumer?: number
}

export interface CostCarOptionsEngine {
    horsepowerToWeight?: number,
    torqueToWeight?: number,
    rpm?: {
        horsepower?: number,
        torque?: number
    },
    type: 'gas' | 'diesel'
}

export interface CostCarOptionsTransmission {
    type?: string,
    numberOfSpeeds?: number
}

export interface CostCarOptionsOffRoad {
    driveType?: string,
    groundClearance?: number
}

export interface CostCarOptionsRoominess {
    doorsNumber?: number,
    seatsNumber?: number,
    cargoCapacity?: number
}

export interface CostCarOptionsComfort {
    seatUpholstery?: string,
    steeringWheelTrim?: string,
    legRoom?: number[]
}

export interface CostCarOptionsSafety {
    nhtsa?: number
}

export interface CostCarOptionsWarranty {
    [index: string]: any
}