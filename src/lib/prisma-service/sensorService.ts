import prisma from "./prisma";

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
