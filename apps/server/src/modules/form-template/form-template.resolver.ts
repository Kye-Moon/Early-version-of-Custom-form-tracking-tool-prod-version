import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {FormTemplateService} from './form-template.service';
import {FormTemplate} from './entities/form-template.entity';
import {CreateFormTemplateInput} from './dto/create-form-template.input';
import {UpdateFormTemplateInput} from './dto/update-form-template.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";
import {SearchFormTemplateInput} from "./dto/search-form-template.input";

@Resolver(() => FormTemplate)
export class FormTemplateResolver {
    constructor(private readonly formTemplateService: FormTemplateService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => FormTemplate)
    createFormTemplate(@Args('createFormTemplateInput') createFormTemplateInput: CreateFormTemplateInput) {
        return this.formTemplateService.create(createFormTemplateInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => FormTemplate)
    duplicateFormTemplate(@Args('id', {type: () => String}) id: string) {
        return this.formTemplateService.duplicate(id);
    }


    @UseGuards(AuthGuard)
    @Query(() => [FormTemplate], {name: 'formTemplates'})
    findAll() {
        return this.formTemplateService.findAll();
    }

    @UseGuards(AuthGuard)
    @Query(() => [FormTemplate], {name: 'searchFormTemplates'})
    searchFormTemplates(@Args('searchInput') searchInput: SearchFormTemplateInput) {
        return this.formTemplateService.search(searchInput)
    }

    @UseGuards(AuthGuard)
    @Query(() => FormTemplate, {name: 'formTemplate'})
    findOne(@Args('id', {type: () => String}) id: string) {
        return this.formTemplateService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => FormTemplate)
    updateFormTemplate(@Args('updateFormTemplateInput') updateFormTemplateInput: UpdateFormTemplateInput) {
        return this.formTemplateService.update(updateFormTemplateInput.id, updateFormTemplateInput);
    }

    // @Mutation(() => FormTemplate)
    // removeFormTemplate(@Args('id', { type: () => Int }) id: number) {
    //   return this.formTemplateService.remove(id);
    // }
}
