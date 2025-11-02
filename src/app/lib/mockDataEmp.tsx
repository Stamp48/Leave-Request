export interface EmployeeType {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  division: string;
  department: string;
  position: string;
  phone: string;
  address: string;
  profile_picture: string;
  hire_date: string;
  birth_date: string;
  // CHANGED: Made required and added 'null' type
  supervisor_id: number | null;
}


export const mockEmployees: EmployeeType[] = [
  {
    employee_id: 1,
    first_name: "Alice",
    last_name: "Smith",
    email: "alice@example.com",
    division: "HR",
    department: "Recruitment",
    position: "HR Manager", // from mockPositions id 1
    phone: "555-1001",
    address: "123 Main St, Springfield",
    profile_picture: "/avatars/alice.jpg",
    hire_date: "2020-01-15",
    birth_date: "1990-05-10",
    supervisor_id: null,
  },
  {
    employee_id: 2,
    first_name: "Bob",
    last_name: "Johnson",
    email: "bob@example.com",
    division: "Engineering",
    department: "Backend",
    position: "Senior Backend Engineer", // from mockPositions id 4
    phone: "555-1002",
    address: "456 Oak Ave, Springfield",
    profile_picture: "/avatars/bob.jpg",
    hire_date: "2018-03-22",
    birth_date: "1988-11-23",
    supervisor_id: null,
  },
  {
    employee_id: 3,
    first_name: "Charlie",
    last_name: "Williams",
    email: "charlie@example.com",
    division: "Marketing",
    department: "Digital",
    position: "Marketing Specialist", // from mockPositions id 9
    phone: "555-1003",
    address: "789 Pine Rd, Springfield",
    profile_picture: "/avatars/charlie.jpg",
    hire_date: "2019-07-10",
    birth_date: "1992-02-14",
    supervisor_id: 14,
  },
  {
    employee_id: 4,
    first_name: "David",
    last_name: "Brown",
    email: "david@example.com",
    division: "Sales",
    department: "B2B",
    position: "Sales Executive", // from mockPositions id 11
    phone: "555-1004",
    address: "321 Maple St, Springfield",
    profile_picture: "/avatars/david.jpg",
    hire_date: "2021-05-01",
    birth_date: "1991-08-30",
    supervisor_id: 10,
  },
  {
    employee_id: 5,
    first_name: "Eva",
    last_name: "Davis",
    email: "eva@example.com",
    division: "Engineering",
    department: "Frontend",
    position: "Software Engineer", // from mockPositions id 5
    phone: "555-1005",
    address: "654 Cedar Ave, Springfield",
    profile_picture: "/avatars/eva.jpg",
    hire_date: "2017-09-18",
    birth_date: "1993-12-05",
    supervisor_id: 2,
  },
  {
    employee_id: 6,
    first_name: "Frank",
    last_name: "Miller",
    email: "frank@example.com",
    division: "HR",
    department: "Payroll",
    position: "HR Specialist", // from mockPositions id 2
    phone: "555-1006",
    address: "987 Birch Rd, Springfield",
    profile_picture: "/avatars/frank.jpg",
    hire_date: "2016-11-30",
    birth_date: "1987-03-19",
    supervisor_id: null,
  },
  {
    employee_id: 7,
    first_name: "Grace",
    last_name: "Wilson",
    email: "grace@example.com",
    division: "Finance",
    department: "Accounts",
    position: "Accountant", // from mockPositions id 13
    phone: "555-1007",
    address: "111 Willow St, Springfield",
    profile_picture: "/avatars/grace.jpg",
    hire_date: "2015-04-12",
    birth_date: "1989-07-22",
    supervisor_id: 11,
  },
  {
    employee_id: 8,
    first_name: "Hannah",
    last_name: "Moore",
    email: "hannah@example.com",
    division: "Marketing",
    department: "Events",
    position: "Marketing Specialist", // from mockPositions id 9
    phone: "555-1008",
    address: "222 Aspen Ave, Springfield",
    profile_picture: "/avatars/hannah.jpg",
    hire_date: "2022-02-20",
    birth_date: "1994-10-11",
    supervisor_id: 14,
  },
  {
    employee_id: 9,
    first_name: "Ian",
    last_name: "Taylor",
    email: "ian@example.com",
    division: "Engineering",
    department: "DevOps",
    position: "DevOps Engineer", // from mockPositions id 6
    phone: "555-1009",
    address: "333 Elm St, Springfield",
    profile_picture: "/avatars/ian.jpg",
    hire_date: "2014-06-25",
    birth_date: "1986-01-17",
    supervisor_id: 2,
  },
  {
    employee_id: 10,
    first_name: "Jack",
    last_name: "Anderson",
    email: "jack@example.com",
    division: "Sales",
    department: "Retail",
    position: "Sales Associate Lead", // from mockPositions id 10
    phone: "555-1010",
    address: "444 Poplar Rd, Springfield",
    profile_picture: "/avatars/jack.jpg",
    hire_date: "2013-12-03",
    birth_date: "1990-09-09",
    supervisor_id: null,
  },
  {
    employee_id: 11,
    first_name: "Karen",
    last_name: "Thomas",
    email: "karen@example.com",
    division: "Finance",
    department: "Audit",
    position: "Finance Manager", // from mockPositions id 12
    phone: "555-1011",
    address: "555 Spruce Ave, Springfield",
    profile_picture: "/avatars/karen.jpg",
    hire_date: "2012-08-14",
    birth_date: "1985-04-28",
    supervisor_id: null,
  },
  {
    employee_id: 12,
    first_name: "Leo",
    last_name: "Jackson",
    email: "leo@example.com",
    division: "Engineering",
    department: "QA",
    position: "QA Engineer", // from mockPositions id 7
    phone: "555-1012",
    address: "666 Chestnut St, Springfield",
    profile_picture: "/avatars/leo.jpg",
    hire_date: "2011-10-19",
    birth_date: "1988-06-15",
    supervisor_id: 2,
  },
  {
    employee_id: 13,
    first_name: "Mona",
    last_name: "White",
    email: "mona@example.com",
    division: "HR",
    department: "Training",
    position: "HR Specialist", // from mockPositions id 2
    phone: "555-1013",
    address: "777 Redwood Rd, Springfield",
    profile_picture: "/avatars/mona.jpg",
    hire_date: "2023-01-05",
    birth_date: "1995-03-03",
    supervisor_id: 1,
  },
  {
    employee_id: 14,
    first_name: "Nina",
    last_name: "Harris",
    email: "nina@example.com",
    division: "Marketing",
    department: "PR",
    position: "Marketing Lead", // from mockPositions id 8
    phone: "555-1014",
    address: "888 Magnolia Ave, Springfield",
    profile_picture: "/avatars/nina.jpg",
    hire_date: "2020-07-28",
    birth_date: "1992-08-18",
    supervisor_id: null,
  },
  {
    employee_id: 15,
    first_name: "Oscar",
    last_name: "Martin",
    email: "oscar@example.com",
    division: "Engineering",
    department: "Mobile",
    position: "Software Engineer", // from mockPositions id 5
    phone: "555-1015",
    address: "999 Cypress St, Springfield",
    profile_picture: "/avatars/oscar.jpg",
    hire_date: "2019-05-16",
    birth_date: "1991-12-21",
    supervisor_id: 2,
  },
];