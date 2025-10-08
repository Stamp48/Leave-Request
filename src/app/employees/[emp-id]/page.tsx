import Employee from "./EmployeeCSR";


const mockEmployees = [
  {
    id: 1,
    firstname: "Alice",
    lastname: "Smith",
    username: "alice123",
    email: "alice@example.com",
    department: "HR",
    division: "Recruitment",
    position: "HR Manager",
    phone: "555-1001",
    address: "123 Main St, Springfield",
    avatarUrl: "/avatars/alice.jpg",
    hireDate: "2020-01-15",
    birthDate: "1990-05-10"
    // Top HR Manager → no supervisor
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Johnson",
    username: "bob456",
    email: "bob@example.com",
    department: "Engineering",
    division: "Backend",
    position: "Senior Backend Engineer",
    phone: "555-1002",
    address: "456 Oak Ave, Springfield",
    avatarUrl: "/avatars/bob.jpg",
    hireDate: "2018-03-22",
    birthDate: "1988-11-23"
    // Senior engineer → no supervisor
  },
  {
    id: 3,
    firstname: "Charlie",
    lastname: "Williams",
    username: "charlie789",
    email: "charlie@example.com",
    department: "Marketing",
    division: "Digital",
    position: "Content Strategist",
    phone: "555-1003",
    address: "789 Pine Rd, Springfield",
    avatarUrl: "/avatars/charlie.jpg",
    hireDate: "2019-07-10",
    birthDate: "1992-02-14",
    supervisorId: 14 // reports to Nina (PR Specialist / Marketing lead)
  },
  {
    id: 4,
    firstname: "David",
    lastname: "Brown",
    username: "david321",
    email: "david@example.com",
    department: "Sales",
    division: "B2B",
    position: "Sales Executive",
    phone: "555-1004",
    address: "321 Maple St, Springfield",
    avatarUrl: "/avatars/david.jpg",
    hireDate: "2021-05-01",
    birthDate: "1991-08-30",
    supervisorId: 10 // reports to Jack (Sales Associate lead)
  },
  {
    id: 5,
    firstname: "Eva",
    lastname: "Davis",
    username: "eva654",
    email: "eva@example.com",
    department: "Engineering",
    division: "Frontend",
    position: "Frontend Developer",
    phone: "555-1005",
    address: "654 Cedar Ave, Springfield",
    avatarUrl: "/avatars/eva.jpg",
    hireDate: "2017-09-18",
    birthDate: "1993-12-05",
    supervisorId: 2 // reports to Bob
  },
  {
    id: 6,
    firstname: "Frank",
    lastname: "Miller",
    username: "frank987",
    email: "frank@example.com",
    department: "HR",
    division: "Payroll",
    position: "Payroll Specialist",
    phone: "555-1006",
    address: "987 Birch Rd, Springfield",
    avatarUrl: "/avatars/frank.jpg",
    hireDate: "2016-11-30",
    birthDate: "1987-03-19",
    supervisorId: 1 // reports to Alice
  },
  {
    id: 7,
    firstname: "Grace",
    lastname: "Wilson",
    username: "grace111",
    email: "grace@example.com",
    department: "Finance",
    division: "Accounts",
    position: "Accountant",
    phone: "555-1007",
    address: "111 Willow St, Springfield",
    avatarUrl: "/avatars/grace.jpg",
    hireDate: "2015-04-12",
    birthDate: "1989-07-22",
    supervisorId: 11 // reports to Karen (Finance Audit head)
  },
  {
    id: 8,
    firstname: "Hannah",
    lastname: "Moore",
    username: "hannah222",
    email: "hannah@example.com",
    department: "Marketing",
    division: "Events",
    position: "Event Coordinator",
    phone: "555-1008",
    address: "222 Aspen Ave, Springfield",
    avatarUrl: "/avatars/hannah.jpg",
    hireDate: "2022-02-20",
    birthDate: "1994-10-11",
    supervisorId: 14 // reports to Nina (Marketing lead)
  },
  {
    id: 9,
    firstname: "Ian",
    lastname: "Taylor",
    username: "ian333",
    email: "ian@example.com",
    department: "Engineering",
    division: "DevOps",
    position: "DevOps Engineer",
    phone: "555-1009",
    address: "333 Elm St, Springfield",
    avatarUrl: "/avatars/ian.jpg",
    hireDate: "2014-06-25",
    birthDate: "1986-01-17",
    supervisorId: 2 // reports to Bob
  },
  {
    id: 10,
    firstname: "Jack",
    lastname: "Anderson",
    username: "jack444",
    email: "jack@example.com",
    department: "Sales",
    division: "Retail",
    position: "Sales Associate Lead",
    phone: "555-1010",
    address: "444 Poplar Rd, Springfield",
    avatarUrl: "/avatars/jack.jpg",
    hireDate: "2013-12-03",
    birthDate: "1990-09-09"
    // Head of Sales → no supervisor
  },
  {
    id: 11,
    firstname: "Karen",
    lastname: "Thomas",
    username: "karen555",
    email: "karen@example.com",
    department: "Finance",
    division: "Audit",
    position: "Finance Manager",
    phone: "555-1011",
    address: "555 Spruce Ave, Springfield",
    avatarUrl: "/avatars/karen.jpg",
    hireDate: "2012-08-14",
    birthDate: "1985-04-28"
    // Head of Finance → no supervisor
  },
  {
    id: 12,
    firstname: "Leo",
    lastname: "Jackson",
    username: "leo666",
    email: "leo@example.com",
    department: "Engineering",
    division: "QA",
    position: "QA Engineer",
    phone: "555-1012",
    address: "666 Chestnut St, Springfield",
    avatarUrl: "/avatars/leo.jpg",
    hireDate: "2011-10-19",
    birthDate: "1988-06-15",
    supervisorId: 2 // reports to Bob
  },
  {
    id: 13,
    firstname: "Mona",
    lastname: "White",
    username: "mona777",
    email: "mona@example.com",
    department: "HR",
    division: "Training",
    position: "Training Coordinator",
    phone: "555-1013",
    address: "777 Redwood Rd, Springfield",
    avatarUrl: "/avatars/mona.jpg",
    hireDate: "2023-01-05",
    birthDate: "1995-03-03",
    supervisorId: 1 // reports to Alice
  },
  {
    id: 14,
    firstname: "Nina",
    lastname: "Harris",
    username: "nina888",
    email: "nina@example.com",
    department: "Marketing",
    division: "PR",
    position: "Marketing Lead",
    phone: "555-1014",
    address: "888 Magnolia Ave, Springfield",
    avatarUrl: "/avatars/nina.jpg",
    hireDate: "2020-07-28",
    birthDate: "1992-08-18"
    // Marketing Lead → no supervisor
  },
  {
    id: 15,
    firstname: "Oscar",
    lastname: "Martin",
    username: "oscar999",
    email: "oscar@example.com",
    department: "Engineering",
    division: "Mobile",
    position: "Mobile Developer",
    phone: "555-1015",
    address: "999 Cypress St, Springfield",
    avatarUrl: "/avatars/oscar.jpg",
    hireDate: "2019-05-16",
    birthDate: "1991-12-21",
    supervisorId: 2 // reports to Bob
  }
];

export default function EmployeePage({ params }: { params: { "emp-id": string } }) {
  const employee = mockEmployees.find(e => e.id.toString() === params["emp-id"]);
  const supervisor = employee?.supervisorId ? mockEmployees.find(e => e.id === employee.supervisorId) : null;
  const isSupervisor = mockEmployees.some(e => e.supervisorId === employee?.id);
  console.log("Employee:", employee);
  console.log("Supervisor:", supervisor);


  if (!employee) return <h1>Employee not found</h1>;


  return <Employee employee={employee} supervisor={supervisor ?? undefined} isSupervisor={isSupervisor}/>;

}
