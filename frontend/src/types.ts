export type NewType<Name extends string, T> = T & { __PHANTOM__: Name };

export type IPv4 = `${number}.${number}.${number}.${number}`;
export type IPv6 = `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`;
export type IP = IPv4 | IPv6;

export type EpochTime = NewType<"Timestamp", number>;
