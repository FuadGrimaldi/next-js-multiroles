"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV, FaLock, FaPlus } from "react-icons/fa";
import InCubeStatus from "../Profile/IncubeStatus";
import ProfileCard from "../Profile/ProfileCard";
import AddressForm from "../Profile/AddressForm";

type UserSubs = {
  id: number;
  id_cus: number;
  id_produk: string;
  start_sub: string;
  end_sub: string;
  created_at: string;
  produk: {
    id: string;
    nama: string;
    tinggi: number;
    lebar: number;
    kapasitas: number;
    telur: number;
    pass_access: string;
    price: number;
    active: string;
    created_at: string;
  };
  users: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
  };
};

const SettingCom = () => {
  const [userSubsData, setUserSubsData] = useState<UserSubs[] | null>(null);
  const [productId, setProductId] = useState<string | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIncu, setActiveIncu] = useState<number | null>(null);

  useEffect(() => {
    // Ambil userId dari localStorage
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("user id not found in localStorage");
      return;
    }

    // Fetch API untuk mendapatkan data profil
    const fetchUserSubsData = async () => {
      try {
        const response = await fetch(`/api/user-premium/${userId}`); // Gunakan userId di URL
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log(data);

        setUserSubsData(data.data); // pastikan data berada dalam field 'data'
        setProductId(data.data.produk.id); // Ambil id produk
        localStorage.setItem("productId", data.data.produk.id);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSubsData();
  }, []);

  useEffect(() => {
    if (userSubsData) {
      setActiveIncu(userSubsData.length);
    }
  }, [userSubsData]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-6 lg:pl-[97px] ml-0">
        <InCubeStatus title="Active" value={activeIncu || 0} />
        <InCubeStatus title="Days left" value={29} />
      </div>
      <div className="flex flex-wrap gap-6 w-full lg:pl-[97px] ml-0 mx-auto">
        <ProfileCard />
        <AddressForm />
      </div>
    </div>
  );
};

export default SettingCom;
