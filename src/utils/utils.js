import { names, employees } from "./names"

//* Generate random id, phone number, mail address and birthday-years.
const generateId = (() => Math.floor(Math.random() * Math.floor(Math.random() * Date.now())));

const generatePhoneNumber = () => {
  const maxRoundsToLoop = [2, 7];
  let arrayOfPhoneNumbers = [0, "-",];

  for (let index = 0; index < maxRoundsToLoop[0]; index++) {
    arrayOfPhoneNumbers.splice(1, 0, Math.floor(Math.random() * 9) + 1);
  };
  for (let index = 0; index < maxRoundsToLoop[1]; index++) {
    arrayOfPhoneNumbers.splice(4, 0, Math.floor(Math.random() * 9));
  };

  return arrayOfPhoneNumbers.join().replace(/,/g, "");
};

const generateMobileNumber = () => {
  const maxRoundsToLoop = 8;
  let arrayOfMobileNumbers = [0, 6, "-",];

  for (let index = 0; index < maxRoundsToLoop; index++) {
    arrayOfMobileNumbers.splice(3, 0, Math.floor(Math.random() * 9));
  };

  return arrayOfMobileNumbers.join().replace(/,/g, "");
};

const getPhoneNumber = () => {
  const phoneNumber = [generatePhoneNumber(), generateMobileNumber()];
  const result = phoneNumber[Math.floor(Math.random() * phoneNumber.length)];
  return result;
};


const mailProvider = [
  "gmail.com",
  "hotmail.com",
  "icloud.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "zoho.com",
  "mail.com",
  "protonmail.com"
];

const generateMailProvider = 
  (mailProvider => mailProvider[Math.floor(Math.random() * mailProvider.length)]);

const lowerCaseWithoutWhitespace = (name => name.toLowerCase().replace(/ /g, ""));

const generateMailAddress = (name, surname) => {
  const mailAddress = 
    `${lowerCaseWithoutWhitespace(name)}${lowerCaseWithoutWhitespace(surname)}@` + generateMailProvider(mailProvider);
  return mailAddress;
};


const generateBirthdayYear = (endYear, startYear) => {
  let years = [];

  for (let index = startYear; index <= endYear; index++) {
    years.push(startYear);
    startYear++;
  };

  const singleYear = years[Math.floor(Math.random() * years.length)];
  return singleYear;
};


const arrayOfPatients = names.map(person => {
  const addPatientInfo = {
    id: generateId(),
    phone: getPhoneNumber(),
    mail: generateMailAddress(person.name, person.surname),
    birthday: generateBirthdayYear(2020, 1930),
  };

  const updatedPatientInfo = { ...person, ...addPatientInfo };

  return updatedPatientInfo;
});

const arrayOfEmployees = employees.map(employee => {
  const addEmployeeInfo = {
    id: generateId(),
    phone: getPhoneNumber(),
    mail: generateMailAddress(employee.name, employee.surname),
    birthday: generateBirthdayYear(2002, 1935),
  };

  const updatedEmployeeInfo = { ...employee, ...addEmployeeInfo };
  updatedEmployeeInfo.mail = 
    `${lowerCaseWithoutWhitespace(employee.name)}${lowerCaseWithoutWhitespace(employee.surname)}@tandartspraktijkbvt.nl`;

  return updatedEmployeeInfo;
});

export { arrayOfEmployees, arrayOfPatients };