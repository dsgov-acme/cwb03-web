import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from '@dsg/shared/data-access/user-api';
import { ENVIRONMENT_CONFIGURATION, IEnvironment } from '@dsg/shared/utils/environment';
import { Filter, HttpBaseService, PagingRequestModel, PagingResponseModel } from '@dsg/shared/utils/http';
import { LoggingService } from '@dsg/shared/utils/logging';
import { Observable, map, of } from 'rxjs';
import {
  ConfiguredEnums,
  EmployerProfileInvite,
  FormModel,
  IActiveForm,
  IConversation,
  IConversationsPaginationResponse,
  ICustomerProvidedDocument,
  IEmployerProfileInvite,
  IEmployerProfilePaginationResponse,
  IForm,
  INewConversationResponse,
  INote,
  INotesPaginationResponse,
  IParentSchemas,
  IProcessDocumentsResponse,
  IRecordListCount,
  ISchemaDefinition,
  ISchemasPaginationResponse,
  ITransaction,
  ITransactionDefinition,
  ITransactionStatusCount,
  ITransactionsPaginationResponse,
  IUserEmployerProfile,
  NewConversationModel,
  NoteModel,
  ProcessDocumentsModel,
  RecordListCountModel,
  RecordListModel,
  SchemaDefinitionModel,
  TransactionDefinitionModel,
  TransactionModel,
  UpdateTransactionOptions,
  UserEmployerProfileModel,
} from '../models';
import { DashboardCountModel, IDashboardCount } from '../models/dashboard/dashboard-count.model';
import { DashboardModel, IDashboard } from '../models/dashboard/dashboard.model';
import { EmployerProfileLink, IEmployerProfileLink } from '../models/employer-profile/employer-profile-link.model';
import { MTALocation, PromiseTimeRequest, PromiseTimeResponse } from '../models/mta/mta.models';
import { IRecordDefinition, RecordDefinitionModel } from '../models/record-definition/record-definition.model';
import { IRecord, IRecordsPaginationResponse, RecordModel, UpdateRecordOptions } from '../models/record/record.model';
import { ISchemaTreeDefinition, SchemaTreeDefinitionModel } from '../models/schema-tree/schema-tree.model';
import { IWorkflow, IWorkflowPaginationResponse, IWorkflowTask, WorkflowModel } from '../models/workflow/workflow.model';

/**
 * This service is only used to expose endpoints, no logic should go in this service
 */
@Injectable({
  providedIn: 'root',
})
export class WorkApiRoutesService extends HttpBaseService {
  constructor(
    protected override readonly _http: HttpClient,
    @Inject(ENVIRONMENT_CONFIGURATION) protected readonly _environment: IEnvironment,
    protected override readonly _loggingService: LoggingService,
  ) {
    super(_http, `${_environment.httpConfiguration.baseUrl}/wm/api`, _loggingService);
  }

  public intializeRiderFromUser$(user: UserModel) {
    return this._handlePost$<RecordModel>(`/v1/rider/initialize`, { email: user.email, userId: user.id }).pipe(
      map(recordSchema => new RecordModel(recordSchema)),
    );
  }

  public getPromiseTimes$(promiseTimeRequest: PromiseTimeRequest): Observable<PromiseTimeResponse> {
    return this._handlePost$<PromiseTimeResponse>(`/v1/ride-request/promise-times`, promiseTimeRequest);
  }

  public getSavedLocationsByUserId$(userId: string): Observable<MTALocation[]> {
    return this._handleGet$<MTALocation[]>(`/v1/saved-locations?userId=${userId}`);
  }

  public getSavedLocationsByRiderId$(riderId: string): Observable<MTALocation[]> {
    return this._handleGet$<MTALocation[]>(`/v1/saved-locations?riderId=${riderId}`);
  }

  /**
   * Update a form data schema definition
   */
  public updateSchemaDefinition$(key: string, schemaDefinitionModel: SchemaDefinitionModel): Observable<SchemaDefinitionModel> {
    return this._handlePut$<ISchemaDefinition>(`/v1/admin/schemas/${key}`, schemaDefinitionModel.toSchema()).pipe(
      map(schemaDefinition => new SchemaDefinitionModel(schemaDefinition)),
    );
  }

  /**
   * Create a form data schema definition
   */
  public createSchemaDefinition$(schemaDefinitionModel: SchemaDefinitionModel): Observable<SchemaDefinitionModel> {
    return this._handlePost$<ISchemaDefinition>(`/v1/admin/schemas`, schemaDefinitionModel.toSchema()).pipe(
      map(schemaDefinition => new SchemaDefinitionModel(schemaDefinition)),
    );
  }

  public getSchemaDefinitionByKey$(key: string): Observable<SchemaDefinitionModel> {
    return this._handleGet$<ISchemaDefinition>(`/v1/admin/schemas/${key}`).pipe(map(schemaDefinition => new SchemaDefinitionModel(schemaDefinition)));
  }

  /**
   * Get a list of form data schema definition
   */
  public getSchemaDefinitionList$(): Observable<SchemaDefinitionModel> {
    return this._handleGet$<ISchemaDefinition>(`/v1/admin/entity/schema`).pipe(map(schemaDefinition => new SchemaDefinitionModel(schemaDefinition)));
  }

  /**
   * Update a transaction definition
   */
  public updateTransactionDefinition$(key: string, transactionDefinitionModel: TransactionDefinitionModel): Observable<TransactionDefinitionModel> {
    return this._handlePut$<ITransactionDefinition>(`/v1/admin/transactions/${key}`, transactionDefinitionModel.toSchema()).pipe(
      map(transactionDefinition => new TransactionDefinitionModel(transactionDefinition)),
    );
  }
  /**
   * Create a transaction definition
   */
  public createTransactionDefinition$(transactionDefinitionModel: TransactionDefinitionModel): Observable<TransactionDefinitionModel> {
    return this._handlePost$<ITransactionDefinition>(`/v1/admin/transactions`, transactionDefinitionModel.toSchema()).pipe(
      map(transactionDefinition => new TransactionDefinitionModel(transactionDefinition)),
    );
  }

  /**
   * Get transaction definition by key
   */
  public getTransactionDefinitionByKey$(key: string): Observable<TransactionDefinitionModel> {
    return this._handleGet$<ITransactionDefinition>(`/v1/admin/transactions/${key}`).pipe(
      map(transactionDefinitionSchema => new TransactionDefinitionModel(transactionDefinitionSchema)),
    );
  }

  /**
   * Get all work manager enumerations
   */
  public getEnumerations$(): Observable<ConfiguredEnums> {
    return this._handleGet$<ConfiguredEnums>('/v1/enumerations').pipe();
  }

  /**
   * Get transactions
   */
  public getTransactionsList$(
    transactionDefinitionSetKey?: string,
    filters?: Filter[],
    pagingRequestModel?: PagingRequestModel,
  ): Observable<ITransactionsPaginationResponse<TransactionModel>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('transactionDefinitionSetKey', transactionDefinitionSetKey ?? '');
    filters?.forEach(filter => {
      httpParams = httpParams.append(filter?.field, filter?.value);
    });

    return this._handleGet$<ITransactionsPaginationResponse<ITransaction>>(
      `/v1/transactions${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      filters || transactionDefinitionSetKey
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(transactionsSchema => ({
        items: transactionsSchema.items?.map(transactionSchema => new TransactionModel(transactionSchema)),
        pagingMetadata: new PagingResponseModel(transactionsSchema.pagingMetadata),
      })),
    );
  }

  /**
   * Get transaction definitions list
   */
  public getTransactionDefinitionsList$(
    filters?: Filter[],
    pagingRequestModel?: PagingRequestModel,
  ): Observable<ITransactionsPaginationResponse<ITransactionDefinition>> {
    let httpParams = new HttpParams();
    filters?.forEach(filter => {
      if (filter.value) {
        httpParams = httpParams.append(filter?.field, filter?.value);
      }
    });

    return this._handleGet$<ITransactionsPaginationResponse<ITransactionDefinition>>(
      `/v1/admin/transactions${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      filters
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(transactionsSchema => ({
        items: transactionsSchema.items?.map(transactionDefinition => new TransactionDefinitionModel(transactionDefinition)),
        pagingMetadata: new PagingResponseModel(transactionsSchema.pagingMetadata),
      })),
    );
  }

  /**
   * Get schemas list
   */
  public getSchemaDefinitionsList$(filters?: Filter[], pagingRequestModel?: PagingRequestModel): Observable<ISchemasPaginationResponse<ISchemaDefinition>> {
    let httpParams = new HttpParams();
    filters?.forEach(filter => {
      if (filter.value) {
        httpParams = httpParams.append(filter?.field, filter.value);
      }
    });

    return this._handleGet$<ISchemasPaginationResponse<ISchemaDefinition>>(
      `/v1/admin/schemas${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      filters
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(schemas => ({
        items: schemas.items?.map(schemaDefinition => new SchemaDefinitionModel(schemaDefinition)),
        pagingMetadata: new PagingResponseModel(schemas.pagingMetadata),
      })),
    );
  }

  /**
   * Get schema tree from key
   */
  public getSchemaTree$(key: string): Observable<SchemaTreeDefinitionModel> {
    let httpParams = new HttpParams();

    httpParams = httpParams.append('includeChildren', true);

    return this._handleGet$<ISchemaTreeDefinition>(`/v1/admin/schemas/${key}`, {
      params: httpParams,
    }).pipe(map(response => new SchemaTreeDefinitionModel(response)));
  }

  /**
   * get list of all the schema parent that have a relationship, directly or indirectly, with a given child schema key.
   * @param key child schema key
   * @returns list of the schema parent
   */
  public getSchemaParents$(key: string): Observable<IParentSchemas> {
    return this._handleGet$<IParentSchemas>(`/v1/admin/schemas/${key}/parents`);
  }

  /**
   * Get workflows list
   */
  public getWorkflowsList$(pagingRequestModel?: PagingRequestModel): Observable<IWorkflowPaginationResponse<IWorkflow>> {
    return this._handleGet$<IWorkflowPaginationResponse<IWorkflow>>(`/v1/admin/workflows${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`).pipe(
      map(workflow => ({
        items: workflow.items?.map(workflowModel => new WorkflowModel(workflowModel)),
        pagingMetadata: new PagingResponseModel(workflow.pagingMetadata),
      })),
    );
  }

  /**
   * Get workflow task list
   */
  public getWorkflowTasks$(processDefinitionKey: string): Observable<IWorkflowTask[]> {
    return this._handleGet$<IWorkflowTask[]>(`/v1/admin/workflows/${processDefinitionKey}/tasks`).pipe();
  }

  /**
   * Create a new transaction instance
   */
  public createTransaction$(transactionDefinitionKey: string, metadata?: Map<string, object>): Observable<TransactionModel> {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const metadataObj: { [key: string]: object } = {};
    if (metadata) {
      metadata.forEach((value, key) => {
        metadataObj[key] = value;
      });
    }

    return this._handlePost$<ITransaction>(`/v1/transactions`, { metadata: metadataObj, transactionDefinitionKey }).pipe(
      map(transactionSchema => new TransactionModel(transactionSchema)),
    );
  }

  /**
   * Update transaction by id
   */
  public updateTransactionById$(data: UpdateTransactionOptions): Observable<TransactionModel> {
    return this._handlePut$<ITransaction>(`/v1/transactions/${data.transactionId}`, data.transaction, {
      params: {
        completeTask: data.completeTask ? 'true' : 'false',
        ...(data.formStepKey !== undefined && { formStepKey: data.formStepKey }),
        ...(data.taskId !== undefined && { taskId: data.taskId }),
      },
    }).pipe(map(transactionSchema => new TransactionModel(transactionSchema)));
  }

  /**
   * Get transaction by id
   */
  public getTransactionById$(transactionId: string): Observable<TransactionModel> {
    return this._handleGet$<ITransaction>(`/v1/transactions/${transactionId}`).pipe(map(transactionSchema => new TransactionModel(transactionSchema)));
  }

  /**
   * Update transaction customer provided documents
   */
  public updateTransactionDocumentsById$(
    transactionId: string,
    documentId: string,
    customerProvidedDocument: ICustomerProvidedDocument,
  ): Observable<ICustomerProvidedDocument> {
    return this._handlePut$<ICustomerProvidedDocument>(`/v1/transactions/${transactionId}/documents/${documentId}`, customerProvidedDocument).pipe(
      map(document => document),
    );
  }

  /**
   * Get all transactions for the authenticated user
   */
  public getAllTransactionsForUser$(filters?: Filter[], paginationModel?: PagingRequestModel): Observable<ITransactionsPaginationResponse<TransactionModel>> {
    let httpParams = new HttpParams();
    filters?.forEach(filter => {
      httpParams = httpParams.append(filter?.field, filter?.value);
    });

    return this._handleGet$<ITransactionsPaginationResponse<ITransaction>>(
      `/v1/my-transactions${paginationModel ? paginationModel.toSchema() : ''}`,
      filters
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(transactionsSchema => ({ ...transactionsSchema, items: transactionsSchema.items.map(transactionSchema => new TransactionModel(transactionSchema)) })),
    );
  }

  /**
   * Get active form metadata for a transaction, if a taskName is not provided this will return the form for the first task
   */
  public getFormByTransactionId$(transactionId: string, taskName?: string): Observable<FormModel> {
    return this._handleGet$<IActiveForm>(`/v1/transactions/${transactionId}/active-forms`).pipe(
      map(activeForms => {
        const _taskName = taskName ?? Object.keys(activeForms)[0];

        return new FormModel({
          ...activeForms[_taskName],
          configuration: activeForms[_taskName].configuration,
          taskName: _taskName,
        });
      }),
    );
  }

  /**
   * Get all statuses for the transactions and counts for each
   */
  public getTransactionStatuses$(): Observable<ITransactionStatusCount[]> {
    return this._handleGet$<ITransactionStatusCount[]>(`/v1/transactions/statuses/count`).pipe(map(statuses => statuses));
  }

  /**
   * Get form configuration from the api
   */
  public getFormConfigurations$(transactionDefinitionKey: string): Observable<IForm[]> {
    return this._handleGet$<IForm[]>(`/v1/admin/transactions/${transactionDefinitionKey}/forms`).pipe();
  }

  /**
   * Get form configuration from the api
   */
  public getFormConfigurationByKey$(transactionDefinitionKey: string, key: string): Observable<IForm> {
    return this._handleGet$<IForm>(`/v1/admin/transactions/${transactionDefinitionKey}/forms/${key}`).pipe();
  }

  /**
   * upsert the form configuration in the api
   */
  public updateFormConfiguration$(formWrapper: Partial<IForm>, transactionDefinitionKey: string, key: string): Observable<IForm> {
    return this._handlePut$<IForm>(`/v1/admin/transactions/${transactionDefinitionKey}/forms/${key}`, formWrapper, {}).pipe();
  }
  /**
   * create a new form configuration in the api
   */
  public createFormConfiguration$(formWrapper: Partial<IForm>, transactionDefinitionKey: string): Observable<IForm> {
    return this._handlePost$<IForm>(`/v1/admin/transactions/${transactionDefinitionKey}/forms`, formWrapper, {}).pipe();
  }

  /**
   * Create a new note for a transaction
   */
  public createNote$(transactionId: string, noteModel: NoteModel): Observable<NoteModel> {
    return this._handlePost$<INote>(`/v1/transactions/${transactionId}/notes`, noteModel.toSchema()).pipe(map((note: INote) => new NoteModel(note)));
  }

  /**
   * Get notes for a transaction
   */
  public getNotes$(transactionId: string, pagingRequestModel?: PagingRequestModel): Observable<INotesPaginationResponse<NoteModel>> {
    return this._handleGet$<INotesPaginationResponse<NoteModel>>(
      `/v1/transactions/${transactionId}/notes/${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
    ).pipe(
      map(notesSchema => ({
        items: notesSchema.items.map(noteSchema => new NoteModel(noteSchema)),
        pagingMetadata: new PagingResponseModel(notesSchema.pagingMetadata),
      })),
    );
  }

  /**
   * Get a note from a transaction
   */
  public getNote$(transactionId: string, noteId: string): Observable<NoteModel> {
    return this._handleGet$<NoteModel>(`/v1/transactions/${transactionId}/notes/${noteId}`);
  }

  /**
   * Delete a note for a transaction
   */
  public deleteNote$(transactionId: string, noteId: string): Observable<void> {
    return this._handleDelete$(`/v1/transactions/${transactionId}/notes/${noteId}`, { observe: 'response' });
  }

  /**
   * Update a note for a transaction
   */
  public updateNote$(transactionId: string, noteId: string, noteModel: NoteModel): Observable<NoteModel> {
    return this._handlePut$<INote>(`/v1/transactions/${transactionId}/notes/${noteId}`, noteModel.toSchema()).pipe(map((note: INote) => new NoteModel(note)));
  }

  /**
   * Initiate documents processing
   */
  public processDocuments$(transactionId: string, processDocumentsModel: ProcessDocumentsModel): Observable<IProcessDocumentsResponse> {
    return this._handlePost$<IProcessDocumentsResponse>(`/v1/transactions/${transactionId}/process-documents`, processDocumentsModel.toSchema()).pipe(
      map(processDocumentsResponseSchema => processDocumentsResponseSchema),
    );
  }

  /**
   * Get a single dashboard by transaction set key
   */
  public getDashboard$(transactionSetKey: string): Observable<DashboardModel> {
    return this._handleGet$<IDashboard>(`/v1/admin/dashboards/${transactionSetKey}`).pipe(map(dashboardSchema => new DashboardModel(dashboardSchema)));
  }

  /**
   * Get all dashboards
   */
  public getDashboards$(): Observable<DashboardModel[]> {
    return this._handleGet$<IDashboard[]>(`/v1/admin/dashboards`).pipe(
      map(dashboardsSchema => dashboardsSchema.map(dashboardSchema => new DashboardModel(dashboardSchema))),
    );
  }

  /**
   * Gets counts for each dashboard tab
   */
  public getDashboardCounts$(transactionSetKey: string): Observable<DashboardCountModel[]> {
    return this._handleGet$<IDashboardCount[]>(`/v1/admin/dashboards/${transactionSetKey}/counts`).pipe(
      map((dashboardCountSchemaArray: IDashboardCount[]) => dashboardCountSchemaArray.map(schema => new DashboardCountModel(schema))),
    );
  }

  /**
   * Get user links to an employer profile
   */
  public getEmployerProfileLinks$(
    employerProfileId: string,
    filters?: Filter[],
    pagingRequestModel?: PagingRequestModel,
  ): Observable<IEmployerProfilePaginationResponse<EmployerProfileLink>> {
    let httpParams = new HttpParams();

    filters?.forEach(filter => {
      httpParams = httpParams.append(filter.field, filter.value);
    });

    return this._handleGet$<IEmployerProfilePaginationResponse<IEmployerProfileLink>>(
      `/v1/employer-profiles/${employerProfileId}/link${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      filters
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(response => ({
        items: response.items.map((link: IEmployerProfileLink) => new EmployerProfileLink(link)),
        pagingMetadata: new PagingResponseModel(response.pagingMetadata),
      })),
    );
  }

  /**
   * Delete user link to employer profile
   */
  public deleteEmployerProfileLink$(employerProfileId: string, userId: string): Observable<void> {
    return this._handleDelete$(`/v1/employer-profiles/${employerProfileId}/link/${userId}`);
  }

  /**
   * Update employer profile link by user id
   */
  public updateEmployerProfileLinkAccessLevel$(employerProfileId: string, userId: string, accessLevel: string): Observable<EmployerProfileLink> {
    return this._handlePut$<IEmployerProfileLink>(`/v1/employer-profiles/${employerProfileId}/link/${userId}`, {
      profileAccessLevel: accessLevel,
    }).pipe(map((link: IEmployerProfileLink) => new EmployerProfileLink(link)));
  }

  /**
   * Get employer/indiviual profiles for the current user
   */
  public getUserProfiles$(type?: string): Observable<UserEmployerProfileModel[]> {
    let httpParams = new HttpParams();
    if (type) {
      httpParams = httpParams.append('type', type);
    }

    return this._handleGet$<IUserEmployerProfile[]>(`/v1/my-profiles`, { params: httpParams }).pipe(
      map(profiles => profiles.map(profile => new UserEmployerProfileModel(profile))),
    );
  }

  /**
   * Creates an new invitation to link to an  employer profile by profile ID
   */
  public inviteUserEmployerProfile$(employerProfileId: string, email: string, accessLevel: string): Observable<IEmployerProfileInvite> {
    const body = {
      accessLevel,
      email,
    };

    return this._handlePost$<IEmployerProfileInvite>(`/v1/employer-profiles/${employerProfileId}/invitations`, body);
  }

  /**
   * Get user links to an employer profile
   */
  public getEmployerProfileInvites$(
    employerProfileId: string,
    filters?: Filter[],
    pagingRequestModel?: PagingRequestModel,
  ): Observable<IEmployerProfilePaginationResponse<EmployerProfileInvite>> {
    let httpParams = new HttpParams();

    filters?.forEach(filter => {
      httpParams = httpParams.append(filter.field, filter.value);
    });

    return this._handleGet$<IEmployerProfilePaginationResponse<IEmployerProfileInvite>>(
      `/v1/employer-profiles/${employerProfileId}/invitations${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      filters
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(response => ({
        items: response.items.map((invite: IEmployerProfileInvite) => new EmployerProfileInvite(invite)),
        pagingMetadata: new PagingResponseModel(response.pagingMetadata),
      })),
    );
  }

  /**
   * Delete user link to employer profile
   */
  public deleteEmployerProfileInvite$(employerProfileId: string, inviteId: string): Observable<void> {
    return this._handleDelete$(`/v1/employer-profiles/${employerProfileId}/invitations/${inviteId}`);
  }

  /**
   * Get collection of conversations the current user is a participant in
   */
  public getConversations$(filters?: Filter[], pagingRequestModel?: PagingRequestModel): Observable<IConversationsPaginationResponse<IConversation>> {
    let httpParams = new HttpParams();

    filters?.forEach(filter => {
      httpParams = httpParams.append(filter.field, filter.value);
    });

    return this._handleGet$<IConversationsPaginationResponse<IConversation>>(
      `/v1/conversations${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      filters
        ? {
            params: httpParams,
          }
        : '',
    );
  }

  /**
   * Get record definitions list
   */
  public getRecordDefinitionsList$(name?: string, pagingRequestModel?: PagingRequestModel): Observable<ITransactionsPaginationResponse<IRecordDefinition>> {
    let httpParams = new HttpParams();
    if (name) {
      httpParams = httpParams.append('name', name);
    }

    return this._handleGet$<IRecordsPaginationResponse<IRecordDefinition>>(
      `/v1/admin/records${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`,
      name
        ? {
            params: httpParams,
          }
        : '',
    ).pipe(
      map(recordDefinitionSchema => ({
        items: recordDefinitionSchema.items?.map(recordDefinition => new RecordDefinitionModel(recordDefinition)),
        pagingMetadata: new PagingResponseModel(recordDefinitionSchema.pagingMetadata),
      })),
    );
  }

  /**
   * Create a record definition
   */
  public createRecordDefinition$(recordDefinitionModel: RecordDefinitionModel): Observable<RecordDefinitionModel> {
    return this._handlePost$<RecordDefinitionModel>(`/v1/admin/records`, recordDefinitionModel.toSchema()).pipe(
      map(recordDefinition => new RecordDefinitionModel(recordDefinition)),
    );
  }

  /**
   * Get record definition by key
   */
  public getRecordDefinitionByKey$(key: string): Observable<RecordDefinitionModel> {
    return this._handleGet$<IRecordDefinition>(`/v1/admin/records/${key}`).pipe(map(recordDefinition => new RecordDefinitionModel(recordDefinition)));
  }

  /**
   * Update a record definition
   */
  public updateRecordDefinition$(key: string, recordDefinitionModel: RecordDefinitionModel): Observable<RecordDefinitionModel> {
    return this._handlePut$<IRecordDefinition>(`/v1/admin/records/${key}`, recordDefinitionModel.toSchema()).pipe(
      map(recordDefinition => new RecordDefinitionModel(recordDefinition)),
    );
  }

  /**
   * Get all record lists (hard-coded for now)
   */
  public getRecordLists$(): Observable<RecordListModel[]> {
    return of([
      new RecordListModel({
        columns: [
          {
            attributePath: 'externalId',
            columnLabel: 'Rider ID',
            sortable: true,
          },
          {
            attributePath: 'data.fullName',
            columnLabel: 'Name',
            sortable: false,
          },
          {
            attributePath: 'data.email',
            columnLabel: 'Email',
            sortable: false,
          },
          {
            attributePath: 'data.phone',
            columnLabel: 'Phone',
            sortable: false,
          },
          {
            attributePath: 'data.homeAddress.address.addressLine1',
            columnLabel: 'Address',
            sortable: false,
          },
          {
            attributePath: 'createdTimestamp',
            columnLabel: 'Intake Date',
            displayFormat: 'DATETIME',
            sortable: true,
          },
        ],
        menuIcon: 'dashboard',
        recordDefinitionKey: 'MTARider',
        recordListLabel: 'Riders',
        tabs: [
          {
            filter: {
              status: 'Active',
            },
            tabLabel: 'Active',
          },
        ],
      }),
    ]);
  }

  /**
   * Gets counts for each record list
   */
  public getRecordListCounts$(recordDefinitionKey: string): Observable<RecordListCountModel[]> {
    return this._handleGet$<IRecordListCount[]>(`/v1/admin/records/${recordDefinitionKey}/counts`).pipe(
      map((recordListCountSchemaArray: IRecordListCount[]) => recordListCountSchemaArray.map(schema => new RecordListCountModel(schema))),
    );
  }

  /**
   * Get records
   */
  public getRecords$(
    recordDefinitionKey?: string,
    status?: string,
    externalId?: string,
    pagingRequestModel?: PagingRequestModel,
  ): Observable<IRecordsPaginationResponse<RecordModel>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('recordDefinitionKey', recordDefinitionKey ?? '');
    httpParams = httpParams.append('status', status ?? '');
    httpParams = httpParams.append('externalId', externalId ?? '');

    return this._handleGet$<IRecordsPaginationResponse<IRecord>>(`/v1/records${pagingRequestModel ? pagingRequestModel.toSchema() : ''}`, {
      params: httpParams,
    }).pipe(
      map(recordsSchema => ({
        items: recordsSchema.items?.map(recordSchema => new RecordModel(recordSchema)),
        pagingMetadata: new PagingResponseModel(recordsSchema.pagingMetadata),
      })),
    );
  }

  /**
   * Create a new record
   */
  public createRecord$(recordDefinitionKey: string, transactionId: string): Observable<RecordModel> {
    return this._handlePost$<IRecord>(`/v1/records`, { recordDefinitionKey, transactionId }).pipe(map(recordSchema => new RecordModel(recordSchema)));
  }

  /**
   * Update record by id
   */
  public updateRecordById$(recordId: string, record: UpdateRecordOptions): Observable<RecordModel> {
    return this._handlePut$<IRecord>(`/v1/records/${recordId}`, record).pipe(map(recordSchema => new RecordModel(recordSchema)));
  }

  /**
   * Get record by id
   */
  public getRecordById$(recordId: string): Observable<RecordModel> {
    return this._handleGet$<IRecord>(`/v1/records/${recordId}`).pipe(map(recordSchema => new RecordModel(recordSchema)));
  }

  /**
   * Create a new converstaion
   */
  public createConversation$(conversation: NewConversationModel): Observable<INewConversationResponse> {
    return this._handlePost$<INewConversationResponse>(`/v1/conversations`, conversation.toSchema());
  }
}
