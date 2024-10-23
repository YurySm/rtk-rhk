export interface IProduct {
    "id": string,
    "name": string,
    "category": ICategory,
    "price": {
        "amount": 899.99,
        "currency": "USD",
        "discount": {
            "percent": 10,
            "validUntil": "2024-12-31"
        }
    },
    images: string[],
    "availability": Availability,
    "manufacturer": {
        "name": "TechCorp",
        "country": "Japan",
        "warranty": {
            "duration": "2 years",
            "service": "Global"
        }
    },
    "features": IFeature[],
    "shipping": IShipping,
    "reviews": IReview[]
}

export interface IFeature {
    "name": string,
    "description": string
}

export interface IReview {
    "user": string,
    "rating": 1 | 2 | 3 | 4 | 5,
    "comment": string,
    "date": string
}

export interface ICategory {
    "id": string,
    "name": string
}

// availability
export enum AvailabilityStatusEnum {
    IN_STOCK = "in_stock",
    OUT_OF_STOCK = "out_of_stock",
    PRE_ORDER = "pre_order",
    DISCONTINUED = "discontinued",
    LIMITED_STOCK = "limited_stock"
}

// Тип для статуса "в наличии"
export type InStockAvailability = {
    status: AvailabilityStatusEnum.IN_STOCK;
    quantity: number; // Количество только для статуса "в наличии"
};

// Тип для статуса "нет в наличии"
export type OutOfStockAvailability = {
    status: AvailabilityStatusEnum.OUT_OF_STOCK;
    restockDate?: string; // Дата, когда товар ожидается в наличии
};

// Тип для статуса "предзаказ"
export type PreOrderAvailability = {
    status: AvailabilityStatusEnum.PRE_ORDER;
    estimatedDeliveryDate: string; // Ожидаемая дата доставки
};

// Тип для статуса "снят с производства"
export type DiscontinuedAvailability = {
    status: AvailabilityStatusEnum.DISCONTINUED;
    reason: string; // Причина снятия с производства
};

// Тип для статуса "ограниченное количество"
export type LimitedStockAvailability = {
    status: AvailabilityStatusEnum.LIMITED_STOCK;
    limit: number; // Ограниченное количество доступных товаров
};

// Объединяем все типы доступности в один
export type Availability =
    | InStockAvailability
    | OutOfStockAvailability
    | PreOrderAvailability
    | DiscontinuedAvailability
    | LimitedStockAvailability;

export interface IShipping {
    "weight": string,
    "dimensions": {
        "width": string,
        "height": string,
        "depth": string
    },
    "origin": string
}