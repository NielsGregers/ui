
interface Role {
  key: string;
  name: string;
  image: string;
  link: string;
  type: "core" | "supporting";
  version: "draft" | "preview" | "published";
  description?: string;
}
export const roles: Role[] = [
  {
    key: "kitchen",
    name: "Kitchen",
    image: "/cava/chef.svg",
    link: "/cava/role/kitchen",
    type: "supporting",
    version: "draft",
    description: "Kitchen is responsible for preparing food and drinks",
  },
  {
    key: "waiter",
    name: "Waiter",
    image: "/cava/waiter.svg",
    link: "/cava/role/waiter",
    type: "supporting",
    version: "draft",
    description: "Waiter is responsible for serving food and drinks",
  },
  {
    key: "organizer",
    name: "Organizer",
    image: "/cava/organizer.svg",
    link: "/cava/role/organizer",
    type: "core",
    version: "preview",
    description: "Organizer is responsible for planning and managing the meeting",
  },
  {
    key: "participant",
    name: "Participant",
    image: "/cava/participants.svg",
    link: "/cava/role/participant",
    type: "core",
    version: "draft",
    description: "Participant is attending the meeting, either in person or remotely",
  },
  {
    key: "presenter",
    name: "Presenter",
    image: "/cava/presenter.svg",
    link: "/cava/role/presenter",
    type: "core",
    version: "draft",
    description: "Presenter is responsible for presenting content to the meeting, either in person or remotely",
  },
  {
    key: "receptionist",
    name: "Receptionist",
    image: "/cava/receptionist.svg",
    link: "/cava/role/receptionist",
    type: "supporting",
    version: "draft",
    description: "Receptionist is responsible for welcoming guests and checking them in",
  },
  {
    key: "dispatcher",
    name: "Dispatcher",
    image: "/cava/receptionist.svg",
    link: "/cava/role/dispatcher",
    type: "supporting",
    version: "draft",
    description: "Dispatcher is responsible for ordering the services need for the meeting",
  },
  {
    key: "security",
    name: "Security",
    image: "/cava/security.svg",
    link: "/cava/role/security",
    type: "supporting",
    version: "draft",
    description: "Security is responsible for the safety of the meeting as well as ensure guests have checked out",
  },
  {
    key: "technician",
    name: "Technician",
    image: "/cava/technician.svg",
    link: "/cava/role/technician",
    type: "supporting",
    version: "draft",
    description: "Technician is responsible for the meeting infrastructure",
  },
];
