export type ContractType = 'Full Time' | 'Part Time' | 'Freelance';

export type Speciality = 'Front End' | 'Back End' | 'Full Stack';

export interface Employee {
    firstName?: string;
    lastName?: string;
    contractType?: ContractType;
    speciality?: Speciality;
    technologies?: string[];
    projects?: string[];
    id?: string;
}