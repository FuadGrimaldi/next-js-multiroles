import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: "/assets/icon/icon-01.svg",
    title: "Internet Of Things",
    description:
      "Leveraging IoT, the egg incubator is connected to a network, allowing remote monitoring and control. Sensors inside the incubator transmit real-time data to ensure optimal hatching conditions.",
  },
  {
    id: 2,
    icon: "/assets/icon/icon-02.svg",
    title: "Real Time Monitoring Dashboard",
    description:
      "A responsive dashboard lets users monitor conditions like temperature and humidity in real-time through web or mobile, ensuring all parameters remain within optimal ranges.",
  },
  {
    id: 3,
    icon: "/assets/icon/icon-03.svg",
    title: "Full Reforts",
    description:
      "Comprehensive reports provide historical data on the incubation cycle, helping users track trends and improve hatching processes with detailed analysis.",
  },
  {
    id: 4,
    icon: "/assets/icon/icon-04.svg",
    title: "Integrated Smart Security",
    description:
      "The system includes smart security to ensure that only authorized users can access the monitoring and control features. Alerts are sent if anomalies or unauthorized access occur",
  },
];

export default featuresData;
