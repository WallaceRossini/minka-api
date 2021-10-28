import { TagIFC } from "./TagInterface";

export interface InvoiceIFC {
  id: string;
  description: string;
  due_date: string;
  value: number;
  paid: boolean;
  tag_id: TagIFC;
}

export interface CreateInvoiceIFC {
  description: string;
  due_date: string;
  value: number;
  paid?: boolean;
  tag_id: TagIFC;
}

export interface UpdateInvoiceIFC {
  description?: string;
  due_date?: string;
  value?: number;
  paid?: boolean;
  tag_id?: string;
}