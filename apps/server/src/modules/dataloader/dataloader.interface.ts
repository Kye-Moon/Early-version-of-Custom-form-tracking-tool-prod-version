import DataLoader from 'dataloader';
import {Job,JobForm} from "gql-types";

export interface IDataLoader {
    load(id: string): Promise<any>;
    jobsLoader:  DataLoader<number, Job>;
    jobFormsLoader:  DataLoader<number, JobForm>;
}