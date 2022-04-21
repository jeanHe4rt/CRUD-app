/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as EntityService from "../service/entity/entity.service";
import {
  BaseEntity,
  Entity,
} from "../models/interface/entity/entity.interface";
/**
 * Router Definition
 */

export const entitiesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

entitiesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const entities: Entity[] = await EntityService.findAll();
    console.log(
      entities.map((element) => `Entity: ${element.id} + ${element.name}`)
    );
    res.status(200).send(entities);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET items/:id

entitiesRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const entity: Entity = await EntityService.find(id);

    if (entity) return res.status(200).send(entity);

    res.send(404).send("Entity not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST items

entitiesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const entity: BaseEntity = req.body;

    const newEntity = await EntityService.create(entity);

    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT items/:id

entitiesRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const entityUpdate: Entity = req.body;
    const isEntity: Entity = await EntityService.find(id);

    if (isEntity) {
      const updateEntity = await EntityService.update(id, entityUpdate);
      return res.status(200).json(updateEntity);
    }

    const newEntity = await EntityService.create(entityUpdate);
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE items/:id

entitiesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);

    await EntityService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
