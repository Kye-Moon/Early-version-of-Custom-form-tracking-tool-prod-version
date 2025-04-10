import DataLoader from "dataloader";
import {JobService} from "../job/job.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DataloaderService {
    constructor(
        private readonly jobService: JobService,        // private readonly projectService: ProjectService,
    ) {
        console.log('DataloaderService initialized');
        console.log('JobService:', this.jobService);
    }

    getLoaders() {
        return {
            jobsLoader: this._createProjectJobsLoader(),
        };
    }

    private _createProjectJobsLoader() {
        return new DataLoader(async (ids: string[]) => {
            console.log("this.jobService", this.jobService)
            return this.jobService.findManyByProjectIds(ids);
        });
    }
}