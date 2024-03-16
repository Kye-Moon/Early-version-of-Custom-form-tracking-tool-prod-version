import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import {ProjectService} from './project.service';
import {Project} from './entities/project.entity';
import {CreateProjectInput} from './dto/create-project.input';
import {UpdateProjectInput} from './dto/update-project.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";
import {JobScopeItem} from "../job-scope-item/entities/job-scope-item.entity";
import {JobRecord} from "../job-record/entities/job-record.entity";
import {Job} from "../job/entities/job.entity";
import {JobService} from "../job/job.service";
import {JobRepository} from "../job/job.repository";

@Resolver(() => Project)
export class ProjectResolver {
    constructor(
        private readonly projectService: ProjectService,
        private readonly jobRepository: JobRepository
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Project)
    createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
        return this.projectService.create(createProjectInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Project], {name: 'projects'})
    findAll() {
        return this.projectService.findAll();
    }

    @UseGuards(AuthGuard)
    @Query(() => Project, {name: 'project'})
    async findOne(@Args('id', {type: () => String}) id: string) {
        const result = await this.projectService.findOne(id);
        console.log(result)
        return result;
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Project)
    updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
        return this.projectService.update(updateProjectInput.id, updateProjectInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Project)
    removeProject(@Args('id', {type: () => String}) id: string) {
        return this.projectService.remove(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => Job)
    async jobs(@Parent() project: Project) {
        const {id} = project;
        return await this.jobRepository.findByProjectId(id);
    }
}
