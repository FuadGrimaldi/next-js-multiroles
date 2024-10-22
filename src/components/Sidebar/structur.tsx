const sidebarStructure = [
  {
    id: "dashboard",
    title: "Dashboard",
    name: "dasbor",
    parent: true,
    icon: "dasbor",
    link: "/user/dashboard",
  },
  {
    id: "report",
    title: "Report",
    name: "report",
    parent: true,
    icon: "mou",
    link: "/user/report",
  },
  {
    id: "setting",
    title: "Setting",
    name: "setting",
    parent: true,
    icon: "perusahaan",
    link: "/user/setting",
  },
  {
    id: "pusat-unduh-data",
    title: "Pusat Unduh Data",
    name: "pusatunduhdata",
    parent: true,
    icon: "pusatunduhdata",
    child: [
      {
        id: "unduh-data-transaksi",
        title: "Unduh Data Transaksi",
        name: "pusatunduhdata.unduhdatatransaksi",
        link: "/dashboard/download/transaction",
        icon: "dot",
      },
      {
        id: "unduh-data-perusahaan",
        title: "Unduh Data Perusahaan",
        name: "pusatunduhdata.unduhdataperusahaan",
        link: "/dashboard/download/company",
        icon: "dot",
      },
      {
        id: "unduh-data-mou",
        title: "Unduh Data MOU",
        name: "pusatunduhdata.unduhdatamou",
        link: "/dashboard/download/mou",
        icon: "dot",
      },
    ],
  },
  {
    id: "logout",
    title: "Logout",
    name: "Logout",
    parent: true,
    icon: "perusahaan",
    link: "/user/Logout",
  },
];

export { sidebarStructure };
