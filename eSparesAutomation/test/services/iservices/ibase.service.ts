import Response from "../../models/response";

export default interface IBaseService<T> {
    create(data: T): Promise<Response>;
    read(name: string): Promise<Response>;
    readById(id: number, name: string) : Promise<Response>;
}