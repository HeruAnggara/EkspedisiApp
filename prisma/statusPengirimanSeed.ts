import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';
const prisma = new PrismaClient()
async function main() {
const statusPengiriman = [
        { statusPengiriman: 'BKD', keterangan: 'Paket anda telah diterima di Lionparcel D Angel Express' },
        { statusPengiriman: 'CARGO PLANE', keterangan: 'Paket anda sedang dalam penerbangan ke area tujuan' },
        { statusPengiriman: 'DEL', keterangan: 'Paket anda sedang dalam pengantaran ke alamat tujuan' },
        { statusPengiriman: 'STI-DEST', keterangan: 'Paket Anda Sudah sampai Gudang Lionparcel Area Tujuan' },
        { statusPengiriman: 'POD', keterangan: 'Paket anda telah diterima di alamat tujuan' },
        { statusPengiriman: 'STI DEST-SC', keterangan: 'Paket anda sedang transit' },
        { statusPengiriman: 'PICKUP_TRUCKING', keterangan: 'Paket anda sedang dalam pengantaran ka area tujuan via darat' },
        { statusPengiriman: 'SHORTLAND', keterangan: 'Paket anda sedang transit' },
        { statusPengiriman: 'PUP', keterangan: 'Paket anda sedang dalam pengantaran ke Gudang Lionparcel Makassar' },
        { statusPengiriman: 'STI', keterangan: 'Paket anda telah di terima di Gudang Lionparcel Makassar' },
        { statusPengiriman: 'TRANSIT', keterangan: 'Paket anda sedang transit' },
        { statusPengiriman: 'DEX', keterangan: 'Paket anda gagal terantar' },
        { statusPengiriman: 'BAGGING', keterangan: 'Paket anda sedang di sortir di gudang Lion parcel' },
        { statusPengiriman: 'HAL', keterangan: 'Paket sedang tertahan di gudang lionparcel' },
        { statusPengiriman: 'CARGO TRACKING', keterangan: 'Paket anda sedang dalam pengantaran ka area tujuan via darat' },
        { statusPengiriman: 'DROPOFF_TRACKING', keterangan: '' },
        { statusPengiriman: 'HND', keterangan: '' },
        { statusPengiriman: 'STI-SC', keterangan: 'Paket anda telah sampai di subconsolidator' },
];

    for (const status of statusPengiriman) {
        await prisma.statusPengiriman.create({
            data: status,
        });
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })