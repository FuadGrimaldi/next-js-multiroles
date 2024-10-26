type Testimonial = {
  id: number;
  name: string;
  destination?: string;
  image: string; // Change type to `string`
  content: string;
  designation: string;
};

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Devid Smith",
    designation: "Founder @democompany",
    image: "/assets/user/user-01.png", // Use the path as a string
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit, ligula sit amet cursus tincidunt, lorem sem elementum nisi, convallis fringilla ante nibh non urna.",
  },
  {
    id: 2,
    name: "John Abraham",
    designation: "Founder @democompany",
    image: "/assets/user/user-02.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit, ligula sit amet cursus tincidunt, lorem sem elementum nisi, convallis fringilla ante nibh non urna.",
  },
  {
    id: 3,
    name: "Abebebebe",
    designation: "Founder @democompany",
    image: "/assets/user/user-01.png", // Use the path as a string
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit, ligula sit amet cursus tincidunt, lorem sem elementum nisi, convallis fringilla ante nibh non urna.",
  },
  {
    id: 4,
    name: "John Therry",
    designation: "Founder @democompany",
    image: "/assets/user/user-02.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit, ligula sit amet cursus tincidunt, lorem sem elementum nisi, convallis fringilla ante nibh non urna.",
  },
  {
    id: 5,
    name: "John Therry",
    designation: "Founder @democompany",
    image: "/assets/user/user-02.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit, ligula sit amet cursus tincidunt, lorem sem elementum nisi, convallis fringilla ante nibh non urna.",
  },
  {
    id: 6,
    name: "John Therry",
    designation: "Founder @democompany",
    image: "/assets/user/user-02.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit, ligula sit amet cursus tincidunt, lorem sem elementum nisi, convallis fringilla ante nibh non urna.",
  },
  // Additional testimonials...
];
