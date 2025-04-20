//Problem 1: Create JSON for each employee with first name, department, designation, salary, raise eligible
const employees = [{
    firstName: "Sam",
    department: "Tech",
    designation: "Manager",
    salary: 40000,
    raiseEligible: "true"
},
{
    firstName: "Mary",
    department: "Finance",
    designation: "Trainee",
    salary: 18500,
    raiseEligible: "true"
},
{
    firstName: "Bill",
    department: "HR",
    designation: "Executive",
    salary: 21200,
    raiseEligible: "false"
}];

console.log("Problem 1: Employee List", employees);

//Problem 2: Create JSON for the company using company name, website, and employees

const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};

console.log("Problem 2: Company Information", company);

//Problem 3: A new employee has joined the company - update the JSON to add this person

const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: "false"
};

company.employees.push(newEmployee);
console.log("Problem 3: Company employees updated", company.employees);

//Problem 4: Calculate total salary of all company employees

let totalSalary=0;
for (const employee of company.employees) {
    totalSalary = totalSalary + employee.salary;
}

console.log("Problem 4: Total salary = $", totalSalary);

//Problem 5: If an employee is raise eligible, increase their salary by 10%. Then set their eligibility to false.

function applyRaisestoEmployees(company) {
    for (const employee of company.employees) {
        if (employee.raiseEligible === "true") {
            let currentSalary = employee.salary;
            let raiseAmount = currentSalary * 0.1;
            let newSalary = currentSalary + raiseAmount;

            employee.salary=newSalary;
            employee.raiseEligible="false"; 
           }   }
}

applyRaisestoEmployees(company);
console.log("Problem 5: Company employees after applying raises", company.employees);

//intermediate step because I was unsure of directions - calculate total salary after raises applied 

function calculateTotalSalaryAfterRaises(company) {
    let TotalSalaryAfterRaises = 0;
    for (const employee of company.employees) {
        TotalSalaryAfterRaises = TotalSalaryAfterRaises + employee.salary;
    }
    return TotalSalaryAfterRaises;
}
let TotalSalaryAfterRaises = calculateTotalSalaryAfterRaises(company);
console.log("Problem 5.5: Updated Salary Total after Raises: $", TotalSalaryAfterRaises);

//Problem 6: Update company employees to reflect that Anna and Sam will work from home

const employeesWorkingFromHome = ["Anna", "Sam"];

for (const employee of company.employees) {
    if (employeesWorkingFromHome.includes(employee.firstName)) {
        employee.wfh = true;
    } else {
        employee.wfh = false;
    }
}

console.log("Problem 6: Company employees with work from home status: ", company.employees);