export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Mutation = {
  __typename?: "Mutation";
  addQueue: Queue;
  removeStudentFromQueue: Queue;
  passQueueStudent: Queue;
  addStudent: Student;
  joinQueue: Student;
  leaveQueue: Student;
};

export type MutationAddQueueArgs = {
  queue: QueueInput;
};

export type MutationRemoveStudentFromQueueArgs = {
  studentTgId: Scalars["Int"];
  queueName: Scalars["String"];
};

export type MutationPassQueueStudentArgs = {
  isPassed: Scalars["Boolean"];
  queueName: Scalars["String"];
};

export type MutationAddStudentArgs = {
  student: StudentInput;
};

export type MutationJoinQueueArgs = {
  studentTgId: Scalars["Int"];
  queueName: Scalars["String"];
};

export type MutationLeaveQueueArgs = {
  studentTgId: Scalars["Int"];
  queueName: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  queue?: Maybe<Queue>;
  queues: Array<Queue>;
  queueFilter: QueueUpdateFilterPayload;
  student?: Maybe<Student>;
  students: Array<Student>;
};

export type QueryQueueArgs = {
  name: Scalars["String"];
};

export type QueryQueueFilterArgs = {
  filterInput: QueueUpdateFilterInput;
};

export type QueryStudentArgs = {
  tgId: Scalars["Int"];
};

export type Queue = {
  __typename?: "Queue";
  id: Scalars["ID"];
  name: Scalars["String"];
  studentToQueues: Array<StudentToQueue>;
  studentToQueuesInQueue: Array<StudentToQueue>;
  students: Array<Student>;
};

export type QueueInput = {
  name: Scalars["String"];
};

export type QueuePlaceType = {
  __typename?: "QueuePlaceType";
  queueName: Scalars["String"];
  place: Scalars["Int"];
  uniqueId: Scalars["Int"];
};

export type QueueUpdateFilterInput = {
  queueId: Scalars["String"];
  upcomingLimit: Scalars["Int"];
  historyLimit: Scalars["Int"];
};

export type QueueUpdateFilterPayload = {
  __typename?: "QueueUpdateFilterPayload";
  queueId: Scalars["ID"];
  upcomingStudentToQueues: Array<StudentToQueue>;
  historyStudentToQueues: Array<StudentToQueue>;
};

export enum Status {
  InQueue = "inQueue",
  Passed = "passed",
  Declined = "declined",
  Left = "left",
  Current = "current"
}

export type Student = {
  __typename?: "Student";
  id: Scalars["ID"];
  tgId: Scalars["Int"];
  name: Scalars["String"];
  studentToQueues: Array<StudentToQueue>;
  studentToQueuesInQueue: Array<StudentToQueue>;
  queues: Array<Queue>;
  queuePlaces: Array<QueuePlaceType>;
};

export type StudentInput = {
  name: Scalars["String"];
  tgId: Scalars["Int"];
};

export type StudentPassedPayload = {
  __typename?: "StudentPassedPayload";
  queueName: Scalars["String"];
  place: Scalars["Int"];
  uniqueId: Scalars["Int"];
  student: Student;
  passed: Scalars["Boolean"];
};

export type StudentPlaceUpdatePayload = {
  __typename?: "StudentPlaceUpdatePayload";
  queueName: Scalars["String"];
  place: Scalars["Int"];
  uniqueId: Scalars["Int"];
  student: Student;
};

export type StudentToQueue = {
  __typename?: "StudentToQueue";
  studentToQueueId: Scalars["Int"];
  studentId: Scalars["ID"];
  queueId: Scalars["ID"];
  status: Status;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  student: Student;
  queue: Queue;
};

export type Subscription = {
  __typename?: "Subscription";
  queueUpdate: Queue;
  queueUpdateFilter: QueueUpdateFilterPayload;
  notifyStudentPlace: StudentPlaceUpdatePayload;
  notifyStudentPassed: StudentPassedPayload;
};

export type SubscriptionQueueUpdateArgs = {
  queueName: Scalars["String"];
};

export type SubscriptionQueueUpdateFilterArgs = {
  filterInput: QueueUpdateFilterInput;
};

export type SubscriptionNotifyStudentPlaceArgs = {
  notifyPlace: Scalars["Int"];
};
export type QueuePlaceFragment = { __typename?: "QueuePlaceType" } & Pick<
  QueuePlaceType,
  "queueName" | "place" | "uniqueId"
>;

export type StudentDataFragment = { __typename?: "Student" } & Pick<
  Student,
  "id" | "name" | "tgId"
>;

export type StudentToQueuesDataFragment = {
  __typename?: "StudentToQueue";
} & Pick<
  StudentToQueue,
  "studentToQueueId" | "status" | "queueId" | "studentId"
>;

export type AddStudentMutationVariables = {
  name: Scalars["String"];
  tgId: Scalars["Int"];
};

export type AddStudentMutation = { __typename?: "Mutation" } & {
  addStudent: { __typename?: "Student" } & StudentDataFragment;
};

export type JoinQueueMutationVariables = {
  queueName: Scalars["String"];
  studentTgId: Scalars["Int"];
};

export type JoinQueueMutation = { __typename?: "Mutation" } & {
  joinQueue: { __typename?: "Student" } & {
    queuePlaces: Array<{ __typename?: "QueuePlaceType" } & QueuePlaceFragment>;
    studentToQueuesInQueue: Array<
      { __typename?: "StudentToQueue" } & StudentToQueuesDataFragment
    >;
  } & StudentDataFragment;
};

export type LeaveQueueMutationVariables = {
  queueName: Scalars["String"];
  studentTgId: Scalars["Int"];
};

export type LeaveQueueMutation = { __typename?: "Mutation" } & {
  leaveQueue: { __typename?: "Student" } & StudentDataFragment;
};

export type QueueQueryVariables = {
  name: Scalars["String"];
};

export type QueueQuery = { __typename?: "Query" } & {
  queue: Maybe<
    { __typename?: "Queue" } & Pick<Queue, "id" | "name"> & {
        studentToQueuesInQueue: Array<
          { __typename?: "StudentToQueue" } & StudentToQueuesDataFragment
        >;
        students: Array<{ __typename?: "Student" } & StudentDataFragment>;
      }
  >;
};

export type QueuesQueryVariables = {};

export type QueuesQuery = { __typename?: "Query" } & {
  queues: Array<{ __typename?: "Queue" } & Pick<Queue, "name">>;
};

export type StudentQueryVariables = {
  tgId: Scalars["Int"];
};

export type StudentQuery = { __typename?: "Query" } & {
  student: Maybe<
    { __typename?: "Student" } & {
      queuePlaces: Array<
        { __typename?: "QueuePlaceType" } & QueuePlaceFragment
      >;
    } & StudentDataFragment
  >;
};

export type PassedNotifySubscriptionVariables = {};

export type PassedNotifySubscription = { __typename?: "Subscription" } & {
  notifyStudentPassed: { __typename?: "StudentPassedPayload" } & Pick<
    StudentPassedPayload,
    "queueName" | "place" | "passed"
  > & { student: { __typename?: "Student" } & StudentDataFragment };
};

export type PlaceNotifySubscriptionVariables = {
  place: Scalars["Int"];
};

export type PlaceNotifySubscription = { __typename?: "Subscription" } & {
  notifyStudentPlace: { __typename?: "StudentPlaceUpdatePayload" } & Pick<
    StudentPlaceUpdatePayload,
    "queueName" | "place"
  > & { student: { __typename?: "Student" } & StudentDataFragment };
};

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};

export default result;
