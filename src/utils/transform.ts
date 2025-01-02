
export const transform = (data: any, transformer: any) => {
    return data.map((item: any) => transformer(item));
}