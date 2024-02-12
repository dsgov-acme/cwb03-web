import { SchemaModel } from '@dsg/shared/utils/http';

export interface RecordListColumn {
  columnLabel: string;
  attributePath: string;
  sortable: boolean;
  displayFormat?: 'DATETIME' | 'USERDATA' | 'PRIORITY';
}

interface Tab {
  tabLabel: string;
  filter: object;
}

export interface IRecordList {
  recordDefinitionKey: string;
  recordListLabel: string;
  menuIcon: string;
  columns: RecordListColumn[];
  tabs: Tab[];
}

export class RecordListModel implements SchemaModel<IRecordList, Partial<IRecordList>> {
  public recordDefinitionKey = '';
  public recordListLabel = '';
  public menuIcon = '';
  public columns: RecordListColumn[] = [];
  public tabs: Tab[] = [];

  constructor(recordListSchema?: IRecordList) {
    if (recordListSchema) {
      this.fromSchema(recordListSchema);
    }
  }

  public fromSchema(recordListSchema: IRecordList): void {
    this.recordDefinitionKey = recordListSchema.recordDefinitionKey;
    this.recordListLabel = recordListSchema.recordListLabel;
    this.menuIcon = recordListSchema.menuIcon;
    this.columns = recordListSchema.columns;
    this.tabs = recordListSchema.tabs;
  }

  public toSchema(): Partial<IRecordList> {
    return {
      columns: this.columns,
      menuIcon: this.menuIcon,
      recordDefinitionKey: this.recordDefinitionKey,
      recordListLabel: this.recordListLabel,
      tabs: this.tabs,
    };
  }
}
