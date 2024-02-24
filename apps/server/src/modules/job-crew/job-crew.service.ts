import {Injectable} from '@nestjs/common';
import {JobCrewMember} from "./entities/job-crew.entity";
import {JobCrewRepository} from "./job-crew.repository";
import {NewJobCrew} from "../../drizzle/schema";
import {UserRepository} from "../user/user.repository";

@Injectable()
export class JobCrewService {
    constructor(
        private readonly jobCrewRepository: JobCrewRepository,
    ) {
    }

    async createMany(jobId: string, crewMemberIds: string[]) {
        const newJobCrewInput: NewJobCrew[] = crewMemberIds.map((crewMemberId) => {
            return {
                jobId,
                crewMemberId,
            }
        });
        return await this.jobCrewRepository.createMany(newJobCrewInput);
    }

    /**
     * Find all crew members for a job
     * @param id
     */
    async findAll(id: string): Promise<JobCrewMember[]> {
        const crew = await this.jobCrewRepository.findJobCrewByJobId(id);
        return crew.map((jobCrew): JobCrewMember => {
            return {
                id: jobCrew.crewMember.id,
                name: jobCrew.crewMember.name,
                phone: jobCrew.crewMember.phone,
            }
        });
    }

    async update(jobId: string, crewIds: string[]) {
        const existingCrew = await this.jobCrewRepository.findJobCrewByJobId(jobId);
        const existingCrewMemberIds = existingCrew.map((jobCrew) => jobCrew.crewMemberId);
        const removeCrewIds = existingCrewMemberIds.filter((id) => !crewIds.includes(id));
        const addCrewIds = crewIds.filter((id) => !existingCrewMemberIds.includes(id));
        if (removeCrewIds.length > 0) {
            await this.deleteManyByJobIdAndCrewIds(jobId, removeCrewIds);
        }
        if (addCrewIds.length > 0) {
            await this.createMany(jobId, addCrewIds);
        }
    }

    /**
     * Delete many crew members for a job
     * @param jobId - job id
     * @param crewIds - crew member ids
     */
    async deleteManyByJobIdAndCrewIds(jobId: string, crewIds: string[]) {
        return this.jobCrewRepository.deleteManyByJobIdAndCrewIds(jobId, crewIds);
    }
}
