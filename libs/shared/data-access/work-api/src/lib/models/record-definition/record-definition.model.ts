import { SchemaModel } from '@dsg/shared/utils/http';

export interface IFormSelectionRule {
  task?: string;
  viewer?: string;
  context?: string;
  formConfigurationKey: string;
}

export interface IRecordDefinition {
  createdBy?: string;
  createdTimestamp?: string;
  description: string;
  expirationDuration: string;
  id?: string;
  key: string;
  lastUpdatedBy?: string;
  lastUpdatedTimestamp?: string;
  name: string;
  recordFormConfigurationSelectionRules: IFormSelectionRule[];
  schemaKey: string;
}

export class RecordDefinitionModel implements SchemaModel<IRecordDefinition> {
  public createdBy? = '';
  public createdTimestamp? = '';
  public description = '';
  public expirationDuration = '';
  public id?: string;
  public key = '';
  public lastUpdatedBy? = '';
  public lastUpdatedTimestamp? = '';
  public name = '';
  public recordFormConfigurationSelectionRules: IFormSelectionRule[] = [];
  public schemaKey = '';

  constructor(recordDefinition?: IRecordDefinition) {
    if (recordDefinition) {
      this.fromSchema(recordDefinition);
    }
  }

  public fromSchema(schema: IRecordDefinition) {
    this.createdBy = schema.createdBy;
    this.createdTimestamp = schema.createdTimestamp;
    this.description = schema.description;
    this.expirationDuration = schema.expirationDuration;
    this.id = schema.id;
    this.key = schema.key;
    this.lastUpdatedBy = schema.lastUpdatedBy;
    this.lastUpdatedTimestamp = schema.lastUpdatedTimestamp;
    this.name = schema.name;
    this.recordFormConfigurationSelectionRules = schema.recordFormConfigurationSelectionRules;
    this.schemaKey = schema.schemaKey;
  }

  public toSchema(): IRecordDefinition {
    return {
      createdBy: this.createdBy,
      createdTimestamp: this.createdTimestamp,
      description: this.description,
      expirationDuration: this.expirationDuration,
      id: this.id,
      key: this.key,
      lastUpdatedBy: this.lastUpdatedBy,
      lastUpdatedTimestamp: this.lastUpdatedTimestamp,
      name: this.name,
      recordFormConfigurationSelectionRules: this.recordFormConfigurationSelectionRules,
      schemaKey: this.schemaKey,
    };
  }
}
