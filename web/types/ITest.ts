import {ETestType} from "./ETestType";

export interface ITest {
  id: string;
  created_at: string;
  updated_at: string;
  type: ETestType;
  name: string;
  active: boolean;
  conversion_url: string;
  selector: string;
  test_page: string;
}
