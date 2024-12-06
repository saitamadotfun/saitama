import { ExtendedModule } from "../extended";
import {
  createTemplate,
  deleteTemplateByUserAndId,
  getTemplateById,
  getTemplates,
  updateTemplateByUserAndId,
} from "./template.controller";

export class Template extends ExtendedModule {
  readonly getTemplates = this.withDatabase(getTemplates);
  readonly createTemplate = this.withDatabase(createTemplate);
  readonly getTemplateById = this.withDatabase(getTemplateById);
  readonly updateTemplateByUserAndId = this.withDatabase(updateTemplateByUserAndId);
  readonly deleteTemplateByUserAndId = this.withDatabase(deleteTemplateByUserAndId);
}
