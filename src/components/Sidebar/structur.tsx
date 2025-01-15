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
    id: "controlling",
    title: "Controlling",
    name: "controlling",
    parent: true,
    icon: "pusatunduhdata",
    child: [
      {
        id: "input-telur",
        title: "Eggs Control",
        name: "input-telur",
        link: "/user/input-telur",
        icon: "dot",
      },
      {
        id: "input-aktuator",
        title: "Incube Control",
        name: "input-aktuator",
        link: "/user/input-telur",
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
    link: "/logout",
  },
];

export { sidebarStructure };
