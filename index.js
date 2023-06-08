function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
    createTimeInEvent: createTimeInEvent,
    createTimeOutEvent: createTimeOutEvent,
    hoursWorkedOnDate: hoursWorkedOnDate,
    wagesEarnedOnDate: wagesEarnedOnDate,
    allWagesFor: allWagesFor,
  };
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(' ');

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return this;
}

function createTimeOutEvent(dateTimeString) {
  const [date, hour] = dateTimeString.split(' ');

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeInEvent = this.timeInEvents.find(event => event.date === date);
  const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

  if (timeInEvent && timeOutEvent) {
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
    return (timeOutHour - timeInHour) / 100;
  }

  return 0;
}

function wagesEarnedOnDate(date) {
  const hoursWorked = this.hoursWorkedOnDate(date);
  const payRate = this.payPerHour;
  const wagesEarned = hoursWorked * payRate;

  return wagesEarned;
}
function findEmployeeByFirstName(collection, firstNameString) {
  // Iterate over each employee in the collection
  for (let i = 0; i < collection.length; i++) {
    const employee = collection[i];
    
    // Check if the employee's first name matches the provided firstNameString
    if (employee.firstName === firstNameString) {
      return employee; // Return the matching employee
    }
  }
  
  // If no employee with the provided first name is found, return null or appropriate value
  return null;
}

function calculatePayroll(employeeRecords) {
  let totalPayroll = 0;

  employeeRecords.forEach(employeeRecord => {
    totalPayroll += employeeRecord.allWagesFor();
  });

  return totalPayroll;
}

 
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */ 

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

