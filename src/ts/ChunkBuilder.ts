import { Vector2 } from "@math.gl/core";
import Level from "./Level";
import { ChunkData } from "./types/ChunkData";

export default class ChunkBuilder
{
    public static getAllChunks() : Array<ChunkData>
    {
        return [
            {
                "spawnPoint": new Vector2(384.0, 128.0),
                "escapePoint": new Vector2(784.0, 336.0),
                "bitmapPos": new Vector2(0.0, 0.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET / 2, 336.0),
                "escapePoint": new Vector2(784.0, 336.0),
                "bitmapPos": new Vector2(25.0, 0.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET / 2, 336.0),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 1, 496.0),
                    new Vector2(Level.OFFSET * 2, 496.0),
                    new Vector2(Level.OFFSET * 3, 496.0),
                    new Vector2(Level.OFFSET * 4, 496.0)
                ],
                "bitmapPos": new Vector2(50.0, 0.0)
            },
            {
                "spawnPoint": new Vector2(96.0, Level.OFFSET),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 1, 496.0),
                    new Vector2(Level.OFFSET * 2, 496.0),
                    new Vector2(Level.OFFSET * 3, 496.0),
                    new Vector2(Level.OFFSET * 4, 496.0)
                ],
                "bitmapPos": new Vector2(75.0, 0.0)
            },
            {
                "spawnPoint": new Vector2(96.0, Level.OFFSET),
                "escapePoint": new Vector2(784.0, 272.0),
                "bitmapPos": new Vector2(0.0, 16.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET/ 2, 272.0),
                "escapePoint": new Vector2(784.0, 272.0),
                "bitmapPos": new Vector2(25.0, 16.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET/ 2, 272.0),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 21, 496.0),
                    new Vector2(Level.OFFSET * 22, 496.0),
                    new Vector2(Level.OFFSET * 23, 496.0),
                    new Vector2(Level.OFFSET * 24, 496.0)
                ],
                "bitmapPos": new Vector2(50.0, 16.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 9, Level.OFFSET),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 21, 496.0),
                    new Vector2(Level.OFFSET * 22, 496.0),
                    new Vector2(Level.OFFSET * 23, 496.0),
                    new Vector2(Level.OFFSET * 24, 496.0)
                ],
                "bitmapPos": new Vector2(75.0, 16.0)
            }
        ];
    }
}