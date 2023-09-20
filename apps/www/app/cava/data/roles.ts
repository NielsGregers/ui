
interface Role {
  sortOrder: number;
  key: string;
  name: string;
  image: string;
  link: string;
  type: "core" | "supporting" | "service";
  version: "draft" | "preview" | "published";
  description?: string;
  linkname?: string;
}
export const roles: Role[] = [
  {
    sortOrder: 2,
    key: "bookplaces",
    name: "Book Places",
    image: "/cava/inroom.svg",
    link: "/cava/book",
    type: "service",
    version: "preview",
    description: "This is where you find places to meet, physically or virtually",
    linkname: "Start Booking",
  },
  {
    sortOrder: 4,
    key: "orderservices",
    name: "Order Services",
    image: "/cava/cava-dark.svg",
    link: "/cava/salesorder",
    type: "service",
    version: "preview",
    description: "Order services for your meeting",
    linkname: "Order Services",
  },
  {
    sortOrder: 70,
    key: "kitchen",
    name: "Kitchen",
    image: "/cava/chef.svg",
    link: "/cava/role/kitchen",
    type: "supporting",
    version: "preview",
    description: "Kitchen is responsible for preparing food and drinks",
  },
  {
    sortOrder: 80,
    key: "waiter",
    name: "Runner",
    image: "/cava/waiter.svg",
    link: "/cava/role/waiter",
    type: "supporting",
    version: "draft",
    description: "Runner is responsible for serving food and drinks",
  },
  {
    sortOrder: 10,
    key: "organizer",
    name: "Organizer",
    image: "/cava/organizer.svg",
    link: "/cava/role/organizer",
    type: "core",
    version: "preview",
    description: "Organizer is responsible for planning and managing the meeting",
  },
  {
    sortOrder: 90,
    key: "participant",
    name: "Participant",
    image: "/cava/participants.svg",
    link: "/cava/role/participant",
    type: "core",
    version: "draft",
    description: "Participant is attending the meeting, either in person or remotely",
  },
  {
    sortOrder: 91,
    key: "presenter",
    name: "Presenter",
    image: "/cava/presenter.svg",
    link: "/cava/role/presenter",
    type: "core",
    version: "draft",
    description: "Presenter is responsible for presenting content to the meeting, either in person or remotely",
  },
  {
    sortOrder: 85,
    key: "receptionist",
    name: "Receptionist",
    image: "/cava/receptionist.svg",
    link: "/cava/role/receptionist",
    type: "supporting",
    version: "draft",
    description: "Receptionist is responsible for welcoming guests and checking them in",
  },
  {
    sortOrder: 60,
    key: "dispatcher",
    name: "Dispatcher",
    image: "/cava/receptionist.svg",
    link: "/cava/role/dispatcher",
    type: "supporting",
    version: "preview",
    description: "Dispatcher is responsible for ordering the services need for the meeting",
  },
  {
    sortOrder: 99,
    key: "security",
    name: "Security",
    image: "/cava/security.svg",
    link: "/cava/role/security",
    type: "supporting",
    version: "preview",
    description: "Security is responsible for the safety of the meeting as well as ensure guests have checked out",
  },
  {
    sortOrder: 75,
    key: "technician",
    name: "Technician",
    image: "/cava/technician.svg",
    link: "/cava/role/technician",
    type: "supporting",
    version: "draft",
    description: "Technician is responsible for the meeting infrastructure",
  },
];
