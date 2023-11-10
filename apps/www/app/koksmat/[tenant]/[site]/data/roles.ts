
export type AccessRoleType = "role.kitchen"  
| "role.runner"
| "role.receptionist"
| "role.dispatcher"
| "role.security"
| "role.technician"
| "role.globaladmin"
| "role.admin"
| "role.admin.rooms.all"
| "role.admin.rooms"
| "role.operator"
| "role.developer"
| "role.tester"
| "orderservices"
| "booking"
| "planning"
| "organizer"
| "participant"
| "presenter"
interface Role {
  sortOrder: number;
  key: string;
  name: string;
  image: string;
  link: string;
  accessrole: AccessRoleType | AccessRoleType[];
  type: `core` | `supporting` | `service`;
  version: `draft` | `preview` | `published`;
  description?: string;
  linkname?: string;
}
export const roles = (site:string): Role[] => {return  [
  {
    sortOrder: 2,
    key: `monitor`,
    accessrole: `role.operator`,
    name: `Navigate`,
    image: `/koksmat/navigate.svg`,
    link: `/koksmat/${site}/book`,
    type: `service`,
    version: `draft`,
    description: `Services Operations`,
    linkname: `View status`,
  },
  {
    sortOrder: 4,
    key: `changemanagement`,
    accessrole: "orderservices",
    name: `Handle Changes`,
    image: `/koksmat/containership-filled.svg`,
    link: `/koksmat/${site}/salesorder`,
    type: `service`,
    version: `draft`,
    description: `Handle Changes - View changes, approve or reject them and see the changes that might impact your services`,
    linkname: `View planned changes`,
  },
  {
    sortOrder: 6,
    key: `taskmanagement`,
    accessrole: "orderservices",
    name: `Handle Tasks`,
    image: `/koksmat/task-board.svg`,
    link: `/koksmat/${site}/salesorder`,
    type: `service`,
    version: `draft`,
    description: `Check incident, deadlines and task status`,
    linkname: `View Tasks`,
  },
  {
    sortOrder: 70,
    key: `kitchen`,
    accessrole: `role.kitchen`,
    name: `Chef`,
    image: `/koksmat/chef.svg`,
    link: `/koksmat/${site}/role/kitchen`,
    type: `supporting`,
    version: `draft`,
    description: `Kitchen is responsible for preparing food and drinks`,
  },
  {
    sortOrder: 80,
    key: `waiter`,
    accessrole: `role.runner`,
    name: `Runner`,
    image: `/koksmat/waiter.svg`,
    link: `/koksmat/${site}/role/waiter`,
    type: `supporting`,
    version: `draft`,
    description: `Runner is responsible for serving food and drinks`,
  },
  {
    sortOrder: 10,
    key: `organizer`,
    accessrole: `organizer`,
    name: `Owner`,
    image: `/koksmat/king-filled.svg`,
    link: `/koksmat/${site}/role/organizer`,
    type: `core`,
    version: `draft`,
    description: `Application Owner is accountable for ...`,
  },
  {
    sortOrder: 90,
    key: `participant`,
    accessrole: `participant`,
    name: `Super User`,
    image: `/koksmat/superwoman-filled.svg`,
    link: `/koksmat/${site}/role/participant`,
    type: `core`,
    version: `draft`,
    description: `Application Responsible is accountable for ...`,
  },
  {
    sortOrder: 91,
    key: `user`,
    accessrole: `presenter`,
    name: `User`,
    image: `/koksmat/participants.svg`,
    link: `/koksmat/${site}/role/presenter`,
    type: `core`,
    version: `draft`,
    description: `Presenter is responsible for presenting content to the meeting, either in person or remotely`,
  },
  {
    sortOrder: 85,
    key: `receptionist`,
    accessrole: `role.receptionist`,
    name: `Receptionist`,
    image: `/koksmat/receptionist.svg`,
    link: `/koksmat/${site}/role/receptionist`,
    type: `supporting`,
    version: `draft`,
    description: `Receptionist is responsible for welcoming guests and checking them in`,
  },
  {
    sortOrder: 60,
    key: `test`,
    accessrole: `role.dispatcher`,
    name: `Tester`,
    image: `/koksmat/receptionist.svg`,
    link: `/koksmat/${site}/role/dispatcher`,
    type: `supporting`,
    version: `preview`,
    description: `Dispatcher is responsible for ordering the services need for the meeting`,
  },
  {
    sortOrder: 99,
    key: `security`,
    accessrole: `role.security`,  
    name: `Security`,
    image: `/koksmat/security.svg`,
    link: `/koksmat/${site}/role/security`,
    type: `supporting`,
    version: `preview`,
    description: `Security is responsible for the safety of the meeting as well as ensure guests have checked out`,
  },
  {
    sortOrder: 75,
    key: `technician`,
    accessrole: `role.technician`,
    name: `Technician`,
    image: `/koksmat/technician.svg`,
    link: `/koksmat/${site}/role/technician`,
    type: `supporting`,
    version: `draft`,
    description: `Technician is responsible for the meeting infrastructure`,
  },
  {
    sortOrder: 110,
    key: `admin`,
    accessrole: ["role.admin.rooms.all","role.admin.rooms"],
    name: `Administrator`,
    image: `/koksmat/technician.svg`,
    link: `/koksmat/${site}/role/admin`,
    type: `supporting`,
    version: `preview`,
    description: `Administrator is responsible for settings and configuration of the CAVA system`,
  },
]}
