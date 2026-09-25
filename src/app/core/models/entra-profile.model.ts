export interface EntraProfile {
  name: string;
  givenName: string;
  familyName: string;
  employeeId: string;
  department: string;
  jobTitle: string;
  entraObjectId: string;
  tenantId: string;
}

export interface EntraProfileResponse {
  status: string;
  profile: EntraProfile;
}