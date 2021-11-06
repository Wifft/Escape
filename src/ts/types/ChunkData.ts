import { Matrix3, Vector2 } from "@math.gl/core";

export type ChunkData = {
    spawnPoint : Vector2,
    escapePoint : Vector2|Array<Vector2>,
    bitmapPos: Vector2
} 