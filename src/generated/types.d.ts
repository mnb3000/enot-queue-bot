declare module "*/queuePlaces.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const QueuePlace: DocumentNode;

  export default defaultDocument;
}

declare module "*/student.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const StudentData: DocumentNode;
  export const Student: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentToQueues.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const StudentToQueuesData: DocumentNode;

  export default defaultDocument;
}

declare module "*/addStudent.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const AddStudent: DocumentNode;

  export default defaultDocument;
}

declare module "*/joinQueue.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const JoinQueue: DocumentNode;

  export default defaultDocument;
}

declare module "*/leaveQueue.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const LeaveQueue: DocumentNode;

  export default defaultDocument;
}

declare module "*/queue.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const Queue: DocumentNode;

  export default defaultDocument;
}

declare module "*/queues.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const Queues: DocumentNode;

  export default defaultDocument;
}

declare module "*/notifyStudentPassed.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const PassedNotify: DocumentNode;

  export default defaultDocument;
}

declare module "*/notifyStudentPlace.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const PlaceNotify: DocumentNode;

  export default defaultDocument;
}
