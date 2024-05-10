import { HttpException, HttpStatus } from "@nestjs/common";

export function isAdmin(levelId: number) {
    if (levelId !== 1) {
        throw new HttpException("Akses ditolak: Pengguna bukan admin.", HttpStatus.UNAUTHORIZED);
    }
}