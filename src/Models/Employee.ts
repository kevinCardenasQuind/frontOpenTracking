export type Employee = {
  name: string;
  team: string;
  team_id: string;
  created_at: string;
  updated_at: string;
  document: string;
};

export interface EmployeeFormProps {
    id: string | undefined;
}

export type FilterCriteria = {
    nameFilter: string;
    documentFilter: string;
    TeamFilter: string;
};
