type FAQ = {
  id: number;
  quest: string;
  ans: string;
};

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "What is the purpose of the IoT incubator?",
    ans: "Our IoT incubator monitors and controls incubation conditions like temperature and humidity in real time, providing optimized hatching conditions for poultry eggs.",
  },
  {
    id: 2,
    quest: "How does the incubator connect to the internet?",
    ans: "The incubator uses Wi-Fi through an ESP8266 microcontroller, allowing data to be sent and accessed remotely via a mobile or web dashboard.",
  },
  {
    id: 3,
    quest: "What parameters can be monitored and adjusted?",
    ans: "Users can monitor temperature, humidity, and incubation status. Settings for these parameters can be adjusted as needed to create ideal hatching conditions.",
  },
  {
    id: 4,
    quest: "Does the incubator provide any alerts or notifications?",
    ans: "Yes, the incubator sends notifications for any critical changes in temperature or humidity, ensuring that users can respond quickly to maintain optimal conditions.",
  },
  {
    id: 5,
    quest: "Can I view historical data for my incubator?",
    ans: "Yes, the platform provides access to historical data and reports on incubation cycles, allowing users to analyze and improve hatch rates.",
  },
  {
    id: 6,
    quest: "How secure is the data on the IoT incubator platform?",
    ans: "The platform uses strong security protocols to protect user data, including secure login and data encryption, ensuring user privacy and data safety.",
  },
];

export default faqData;
