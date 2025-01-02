
export const transform = (data: any, transformer: any) => {
    //check if data is an array
    if (data instanceof Array)
        return data.map((item: any) => transformer(item));
    else
        return transformer(data)
}