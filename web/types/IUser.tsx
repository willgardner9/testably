export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  current_plan: string;
  stripe_id: string;
}
