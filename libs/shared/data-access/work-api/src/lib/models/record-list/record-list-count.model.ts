import { SchemaModel } from '@dsg/shared/utils/http';

export interface IRecordListCount {
  tabLabel: string;
  count: number;
}

export class RecordListCountModel implements SchemaModel<IRecordListCount> {
  public tabLabel = '';
  public count = 0;

  constructor(recordListCountSchema?: IRecordListCount) {
    if (recordListCountSchema) {
      this.fromSchema(recordListCountSchema);
    }
  }
  public fromSchema(schema: IRecordListCount): void {
    this.tabLabel = schema.tabLabel;
    this.count = schema.count;
  }

  public toSchema(): IRecordListCount {
    return {
      count: this.count,
      tabLabel: this.tabLabel,
    };
  }
}
