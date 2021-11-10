import { Vector2 } from "@math.gl/core";
import Level from "./Level";
import { ChunkData } from "./types/ChunkData";

export default class Camera
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
                    new Vector2(Level.OFFSET * 8, 496.0),
                    new Vector2(Level.OFFSET * 9, 496.0),
                    new Vector2(Level.OFFSET * 10, 496.0),
                    new Vector2(Level.OFFSET * 11, 496.0),
                    new Vector2(Level.OFFSET * 12, 496.0),
                    new Vector2(Level.OFFSET * 13, 496.0),
                    new Vector2(Level.OFFSET * 14, 496.0)
                ],
                "bitmapPos": new Vector2(75.0, 16.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 13, Level.OFFSET),
                "escapePoint": new Vector2(784.0, 368.0),
                "bitmapPos": new Vector2(0.0, 32.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 368.0),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 21, 496.0),
                    new Vector2(Level.OFFSET * 22, 496.0), 
                    new Vector2(Level.OFFSET * 23, 496.0), 
                ],
                "bitmapPos": new Vector2(25.0, 32.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 23, Level.OFFSET),
                "escapePoint": new Vector2(784.0, 304.0),
                "bitmapPos": new Vector2(50.0, 32.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET / 2, 304.0),
                "escapePoint": new Vector2(784.0, 80.0),
                "bitmapPos": new Vector2(75.0, 32.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET / 2, 80.0),
                "escapePoint": new Vector2(784.0, 368.0),
                "bitmapPos": new Vector2(0.0, 48.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET / 2, 368.0),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 13, 496.0),
                    new Vector2(Level.OFFSET * 14, 496.0),
                    new Vector2(Level.OFFSET * 15, 496.0),
                    new Vector2(Level.OFFSET * 16, 496.0),
                    new Vector2(Level.OFFSET * 17, 496.0),
                    new Vector2(Level.OFFSET * 18, 496.0),
                    new Vector2(Level.OFFSET * 19, 496.0),
                    new Vector2(Level.OFFSET * 20, 496.0),
                    new Vector2(Level.OFFSET * 21, 496.0)
                ],
                "bitmapPos": new Vector2(25.0, 48.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 15, Level.OFFSET),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 9, 496.0),
                    new Vector2(Level.OFFSET * 10, 496.0),
                    new Vector2(Level.OFFSET * 11, 496.0),
                    new Vector2(Level.OFFSET * 12, 496.0),
                    new Vector2(Level.OFFSET * 13, 496.0),
                    new Vector2(Level.OFFSET * 14, 496.0),
                    new Vector2(Level.OFFSET * 15, 496.0),
                    new Vector2(Level.OFFSET * 16, 496.0),
                    new Vector2(Level.OFFSET * 17, 496.0),
                    new Vector2(Level.OFFSET * 18, 496.0)
                ],
                "bitmapPos": new Vector2(50.0, 48.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 14, Level.OFFSET),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 7, 496.0),
                    new Vector2(Level.OFFSET * 8, 496.0),
                    new Vector2(Level.OFFSET * 9, 496.0),
                    new Vector2(Level.OFFSET * 17, 496.0),
                    new Vector2(Level.OFFSET * 18, 496.0),
                    new Vector2(Level.OFFSET * 19, 496.0)
                ],
                "bitmapPos": new Vector2(75.0, 48.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 20, Level.OFFSET),
                "escapePoint": new Vector2(779.0, 432.0),
                "bitmapPos": new Vector2(0.0, 64.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 432.0),
                "escapePoint": new Vector2((Level.OFFSET * 24) + Level.OFFSET / 2, 400.0),
                "bitmapPos": new Vector2(25.0, 64.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 400.0),
                "escapePoint": new Vector2((Level.OFFSET * 24) + Level.OFFSET / 2, 400.0),
                "bitmapPos": new Vector2(50.0, 64.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 400.0),
                "escapePoint": new Vector2((Level.OFFSET * 24) + Level.OFFSET / 2, 400.0),
                "bitmapPos": new Vector2(75.0, 64.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 400.0),
                "escapePoint": new Vector2((Level.OFFSET * 24) + Level.OFFSET / 2, 336.0),
                "bitmapPos": new Vector2(0.0, 80.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 336.0),
                "escapePoint": new Vector2((Level.OFFSET * 24) + Level.OFFSET / 2, 80.0),
                "bitmapPos": new Vector2(25.0, 80.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 80.0),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 15, 496.0),
                    new Vector2(Level.OFFSET * 16, 496.0),
                    new Vector2(Level.OFFSET * 17, 496.0)
                ],
                "bitmapPos": new Vector2(50.0, 80.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 15, Level.OFFSET),
                "escapePoint": new Vector2(784.0, 432.0),
                "bitmapPos": new Vector2(75.0, 80.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET, 432.0),
                "escapePoint": [
                    new Vector2(Level.OFFSET * 21, 496.0),
                    new Vector2(Level.OFFSET * 22, 496.0),
                    new Vector2(Level.OFFSET * 23, 496.0)
                ],
                "bitmapPos": new Vector2(0.0, 96.0)
            },
            {
                "spawnPoint": new Vector2(Level.OFFSET * 22, Level.OFFSET),
                "escapePoint": [],
                "bitmapPos": new Vector2(25.0, 96.0)
            }
        ];
    }
}