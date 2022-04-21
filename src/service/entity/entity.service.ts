
/**
 * Data Model Interfaces
 */
import { BaseEntity, Entity } from "../../models/interface/entity/entity.interface";
import { Entities } from "../../models/interface/entity/entities.interface";

/**
 * In-Memory Store
 */

let entities: Entities = {
    1: {
        id: 1,
        name: "Burger"
    },
    2: {
        id: 2,
        name: "Pizza"
    },
    3: {
        id: 3,
        name: "Tea"
    }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Entity[]> => Object.values(entities);

export const find = async (id:number): Promise<Entity> => entities[id];

export const create = async (newEntity: BaseEntity): Promise<Entity> => {

    const id = new Date().valueOf();

    entities[id] = {
        id,
        ...newEntity,
    };

    return entities[id];
}

export const update = async (
    id:number,
    entityUpdate: BaseEntity
    ): Promise<Entity | null> => {
        const entity = await find(id);

        if(!entity)
            return null;
    
        entities[id] = { id, ...entityUpdate};

        return entities[id];

}

// Não tem porque deletar as entidades;
export const remove = async (id:number): Promise<null| void> => {
    const entity = await find(id);  

    if(!entity)
        return null;
    
    delete entities[id];
    
};