export type ContractType = 'Full Time' | 'Part Time' | 'Freelance';

export type Speciality = 'Front End' | 'Back End' | 'Full Stack';

export interface Employee {
    firstName?: string;
    lastName?: string;
    age?: number;
    contractType?: ContractType;
    speciality?: Speciality;
    projects?: string[];
    id?: string;
}