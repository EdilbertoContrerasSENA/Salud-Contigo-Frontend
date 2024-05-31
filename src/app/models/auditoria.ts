
export class Auditoria {
  id: number = 0
  action!: string;
  tableName!: string;
  columnName!: string;
  oldValue!: string;
  newValue!: number;
  actionTime!: number;
}
