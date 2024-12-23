import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export const createSensorData = async (
  id_produk: string,
  suhu: number,
  humid: number,
  gas: number,
  fan: "ON" | "OFF",
  lampu: "ON" | "OFF"
) => {
  return prisma.data_produk.create({
    data: {
      id_produk,
      suhu,
      humid,
      gas,
      fan,
      lampu,
      ts: new Date(),
    },
  });
};

export const getAllSensorData = async () => {
  return prisma.data_produk.findMany({
    orderBy: {
      ts: "desc", // Mengurutkan data berdasarkan timestamp (opsional)
    },
  });
};

// Auth
export async function register(data: {
  username: string;
  email: string;
  password: string;
}) {
  const { username, email, password } = data;

  // 1. Cek apakah email sudah ada di database
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  // 2. Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Simpan pengguna baru ke dalam database
  const newUser = await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
      created_at: new Date(),
    },
  });

  // 4. Kembalikan data pengguna yang baru dibuat (tanpa password)
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}
export async function login(data: { email: string; password: string }) {
  // Cari user berdasarkan email
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  // Jika user ditemukan dan password ada
  if (user && user.password) {
    // Bandingkan hash dari kata sandi yang diberikan dengan hash yang tersimpan
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
      // Jika cocok, kembalikan data pengguna tanpa kata sandi
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
  }

  // Jika user tidak ditemukan atau kata sandi tidak cocok, kembalikan null
  return null;
}
