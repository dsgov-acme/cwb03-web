import { IPaginationResponse, IPagingMetadata, SchemaModel } from '@dsg/shared/utils/http';
import { TransactionModel } from '../transaction/transaction.model';

export interface RecordListSchema {
  items: IRecord[];
  pagingMetadata: IPagingMetadata;
}

export interface IRecord {
  id: string;
  status: string;
  recordDefinitionId: string;
  recordDefinitionKey: string;
  recordDefinitionName: string;
  externalId: string;
  createdBy: string;
  createdFrom: string;
  lastUpdatedBy: string;
  createdTimestamp: string;
  expired: string;
  lastUpdatedFrom: string;
  lastUpdatedTimestamp: string;
  subjectUserId: string;
  data: RecordData;
}

export interface RecordTableData {
  id: string;
}

export interface RecordData {
  [key: string]: unknown;
  /* Put strongly-typed data in here */
  fullName?: string;
}

export interface IRecordsPaginationResponse<T> extends IPaginationResponse {
  items: T[];
}

export interface UpdateRecordOptions {
  status?: string;
  expires?: string;
  data: RecordData;
}

export class RecordModel implements SchemaModel<IRecord> {
  public id = '';
  public status!: string;
  public recordDefinitionId!: string;
  public recordDefinitionKey = '';
  public recordDefinitionName!: string;
  public externalId = '';
  public createdBy = '';
  public createdFrom = '';
  public lastUpdatedBy = '';
  public createdTimestamp = '';
  public expired = '';
  public lastUpdatedFrom = '';
  public lastUpdatedTimestamp = '';
  public subjectUserId = '';
  public data: RecordData = {};

  constructor(recordSchema?: IRecord) {
    if (recordSchema) {
      this.fromSchema(recordSchema);
    }
  }

  public fromSchema(recordSchema: IRecord): void {
    this.id = recordSchema.id;
    this.status = recordSchema.status;
    this.recordDefinitionId = recordSchema.recordDefinitionId;
    this.recordDefinitionKey = recordSchema.recordDefinitionKey;
    this.recordDefinitionName = recordSchema.recordDefinitionName;
    this.externalId = recordSchema.externalId;
    this.createdBy = recordSchema.createdBy;
    this.createdFrom = recordSchema.createdFrom;
    this.lastUpdatedBy = recordSchema.lastUpdatedBy;
    this.createdTimestamp = recordSchema.createdTimestamp;
    this.expired = recordSchema.expired;
    this.lastUpdatedFrom = recordSchema.lastUpdatedFrom;
    this.subjectUserId = recordSchema.subjectUserId;
    this.data = recordSchema.data;
  }

  public toSchema(): Partial<IRecord> {
    return {
      data: this.data,
    };
  }

  public toDataSchema(): Partial<IRecord> {
    return {
      data: this.data,
    };
  }

  public toTransactionModel(): TransactionModel {
    const transaction: TransactionModel = new TransactionModel();
    transaction.fromSchema({
      activeTasks: [],
      createdBy: this.createdBy,
      createdByDisplayName: this.createdBy,
      createdTimestamp: this.createdTimestamp,
      data: this.data,
      externalId: this.externalId,
      id: this.id,
      isComplete: false,
      lastUpdatedTimestamp: this.lastUpdatedTimestamp,
      priority: '',
      processInstanceId: '',
      status: this.status,
      subjectProfileId: '',
      subjectProfileType: '',
      subjectUserDisplayName: '',
      subjectUserId: this.subjectUserId,
      submittedOn: '',
      transactionDefinitionId: '',
      transactionDefinitionKey: '',
      transactionDefinitionName: '',
    });

    return transaction;
  }
}
