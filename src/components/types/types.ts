export interface Coins {
    result: Result[];
    meta:   Meta;
}

export interface Meta {
    page:            number;
    limit:           number;
    itemCount:       number;
    pageCount:       number;
    hasPreviousPage: boolean;
    hasNextPage:     boolean;
}

export interface Result {
    id:                    string;
    icon:                  string;
    name:                  string;
    symbol:                string;
    rank:                  number;
    price:                 number;
    priceBtc:              number;
    volume:                number;
    marketCap:             number;
    availableSupply:       number;
    totalSupply:           number;
    fullyDilutedValuation: number;
    priceChange1h:         number;
    priceChange1d:         number;
    priceChange1w:         number;
    redditUrl:             string;
    twitterUrl?:           string;
    explorers:             string[];
    websiteUrl?:           string;
    contractAddress?:      string;
    decimals?:             number;
}

export interface wallet {
    result: walletResult[];
}

export interface walletResult {
    id: string,
    icon: string,
    name: string,
    amount: number,
    symbol: string,
    buyPrice: number,
    price?: number,
}
