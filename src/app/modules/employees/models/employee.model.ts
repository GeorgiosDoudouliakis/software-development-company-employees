export type ContractType = 'full-time' | 'part-time' | 'freelance';

export type Speciality = 'front-end' | 'back-end' | 'full-stack';

export interface Employee {
    firstName?: string;
    lastName?: string;
    age?: number;
    contractType?: ContractType;
    speciality?: Speciality;
    hireDate?: string;
    projects?: string[];
    id?: string;
}