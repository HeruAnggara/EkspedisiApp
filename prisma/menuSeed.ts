import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const menu = [
        { parentId: 0, nameMenu: "Dashboard", icon: "home", status: true, isDropdown: false, position: 1 },
        { parentId: 0, nameMenu: "User Management", icon: "user", status: true, isDropdown: false, position: 2 },
        { parentId: 0, nameMenu: "Data Pengiriman", icon: "list", status: true, isDropdown: false, position: 3 },
        { parentId: 0, nameMenu: "Data Pemasukan", icon: "trending-up", status: true, isDropdown: false, position: 4 },
        { parentId: 0, nameMenu: "Daftar Pengeluaran", icon: "trending-down", status: true, isDropdown: false, position: 5 },
        { parentId: 0, nameMenu: "Supplier", icon: "shopping-bag", status: true, isDropdown: false, position: 6 },
        { parentId: 0, nameMenu: "Log Aktifitas", icon: "clock", status: true, isDropdown: false, position: 7 },
        { parentId: 0, nameMenu: "Log Akses", icon: "activity", status: true, isDropdown: false, position: 8 },
        { parentId: 0, nameMenu: "Pengaturan", icon: "settings", status: true, isDropdown: true, position: 10 },
        { parentId: 9, nameMenu: "Profile", icon: "", status: true, isDropdown: false, position: 1 },
        { parentId: 9, nameMenu: "Ganti Password", icon: "", status: true, isDropdown: false, position: 2 },
        { parentId: 9, nameMenu: "Hak Akses Pengguna", icon: "", status: true, isDropdown: false, position: 3 },
        { parentId: 9, nameMenu: "Role Management", icon: "", status: true, isDropdown: false, position: 4 },
        { parentId: 0, nameMenu: "Master Data", icon: "file-text", status: true, isDropdown: true, position: 11 },
        { parentId: 14, nameMenu: "Jenis Pengeluaran", icon: "", status: true, isDropdown: false, position: 1 },
        { parentId: 14, nameMenu: "Perlengkapan", icon: "", status: true, isDropdown: false, position: 2 },
        { parentId: 0, nameMenu: "Pembelian Perlengkapan", icon: "shopping-cart", status: true, isDropdown: false, position: 12 },
        { parentId: 0, nameMenu: "Laporan", icon: "file-text", status: true, isDropdown: true, position: 13 },
        { parentId: 18, nameMenu: "Laporan Laba/Rugi", icon: "", status: true, isDropdown: false, position: 1 },
        { parentId: 18, nameMenu: "Laporan Transaksi Harian", icon: "", status: true, isDropdown: false, position: 2 },
        { parentId: 0, nameMenu: "Customer", icon: "users", status: true, isDropdown: false, position: 14 },
        { parentId: 9, nameMenu: "Konversi Point", icon: "", status: true, isDropdown: false, position: 5 },
        { parentId: 0, nameMenu: "Invoice", icon: "file-text", status: true, isDropdown: false, position: 15 }
    ];
    
    for (const item of menu) {
        await prisma.masterMenu.create({
            data: item,
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