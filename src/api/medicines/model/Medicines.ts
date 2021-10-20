export interface Medicine {
  id: number;
  name: string;
  via_admin:
    | 'Oral'
    | 'Inyectable'
    | 'Sublingual'
    | 'Nasal'
    | 'Cutáneo'
    | 'Ocular'
    | 'Rectal';
}
