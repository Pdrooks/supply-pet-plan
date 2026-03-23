export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'backlog' | 'in_progress' | 'review' | 'done';
export type Category = 'feature' | 'bug' | 'improvement' | 'content' | 'design';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category: Category;
  createdAt: Date;
}

export const STATUS_LABELS: Record<Status, string> = {
  backlog: 'Backlog',
  in_progress: 'Em Progresso',
  review: 'Em Revisão',
  done: 'Concluído',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  feature: 'Funcionalidade',
  bug: 'Bug',
  improvement: 'Melhoria',
  content: 'Conteúdo',
  design: 'Design',
};
