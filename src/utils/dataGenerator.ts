// helperUtils/dataGenerator.ts

export class DataGenerator {
  email: string;
  department: string;
  phone: string;
  age: string;
  randomString: string;
  salary: string;

  constructor() {
    this.email = DataGenerator.randomEmail();
    this.department = DataGenerator.randomDepartment();
    this.phone = DataGenerator.randomPhoneNumber();
    this.age = DataGenerator.randomAge();
    this.randomString = DataGenerator.randomString('Test');
    this.salary = DataGenerator.randomSalary();
  }

  // Static methods for generating individual values
  static randomString(prefix = '', length = 5): string {
    const random = Math.random().toString(36).substring(2, 2 + length);
    return prefix ? `${prefix}-${random}` : random;
  }

  static randomEmail(): string {
    const random = Math.random().toString(36).substring(2, 8);
    return `TestAuto-${random}@example.com`;
  }

  static randomDepartment(): string {
    const departments = ['QA', 'Development', 'Marketing', 'Sales', 'Finance', 'Support'];
    return departments[Math.floor(Math.random() * departments.length)];
  }

  static randomPhoneNumber(): string {
    const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return `09${digits.slice(0, 9)}`;
  }

  static randomAge(min = 18, max = 60): string {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  static randomSalary(min = 50000, max = 500000): string {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  

}
