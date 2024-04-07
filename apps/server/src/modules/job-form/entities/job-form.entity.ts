import {ObjectType, Field, Int} from '@nestjs/graphql';
import {FormTemplate} from "../../form-template/entities/form-template.entity";

@ObjectType()
export class JobForm {
    @Field(() => String)
    id: string;

    @Field(() => String)
    jobId: string;

    @Field(() => String)
    formTemplateId: string;

    @Field(() => Boolean)
    isActive: boolean;

    @Field(() => FormTemplate)
    formTemplate: FormTemplate;
}
