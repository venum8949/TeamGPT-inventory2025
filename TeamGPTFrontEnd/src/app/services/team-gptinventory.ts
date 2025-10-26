import { Equipment } from '../models/TeamGPTInventory/equipment';
import { FetchApi } from './fetch-api';
import { LoginRequest } from '../models/TeamGPTInventory/login-request';
import { LoginResponse } from '../models/TeamGPTInventory/login-response';
import { RegisterRequest } from '../models/TeamGPTInventory/register-request';
import { RegisterResponse } from '../models/TeamGPTInventory/register-response';
import { Request } from '../models/TeamGPTInventory/request';
import { RequestDto } from '../models/TeamGPTInventory/request-dto';
import { UsageReportDto } from '../models/TeamGPTInventory/usage-report-dto';

const API_ENDPOINT = 'https://localhost:7122';

export async function postLoginResponse(data?: LoginRequest): Promise<LoginResponse | undefined> {
  const body = JSON.stringify(data ?? {
    email: 'string',
    password: 'string'
  });
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  return await FetchApi.fetchApiResponse<LoginResponse | undefined>(`${API_ENDPOINT}/api/Auth/login`, undefined, 'POST', body, headers);
}

export async function postRegisterResponse(data?: RegisterRequest): Promise<RegisterResponse | undefined> {
  const body = JSON.stringify(data ?? {
    email: 'string',
    password: 'string'
  });
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  return await FetchApi.fetchApiResponse<RegisterResponse | undefined>(`${API_ENDPOINT}/api/Auth/register`, undefined, 'POST', body, headers);
}

export async function getUsageReportDto(accesstoken:string, from?: Date, to?: Date, topItems?: number, topUsers?: number): Promise<UsageReportDto | undefined> {
  var fromAsString = from?.toISOString();
  var toAsString = to?.toISOString();
  const query = new URLSearchParams();
  if (fromAsString !== undefined) query.append('from', fromAsString);
  if (toAsString !== undefined) query.append('to', toAsString);
  if (topItems !== undefined) query.append('topItems', topItems.toString());
  if (topUsers !== undefined) query.append('topUsers', topUsers.toString());
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : '')
  };
  return await FetchApi.fetchApiResponse<UsageReportDto | undefined>(`${API_ENDPOINT}/api/Report/usage?${query}`, undefined, 'GET', undefined, headers);
}

export async function getHistoryReportDto(from?: Date, to?: Date): Promise<Report[] | undefined> {
  var fromAsString = from?.toISOString();
  var toAsString = to?.toISOString();
  const query = new URLSearchParams();
  if (fromAsString !== undefined) query.append('from', fromAsString);
  if (toAsString !== undefined) query.append('to', toAsString);
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : '')
  };
  return await FetchApi.fetchApiResponse<Report[] | undefined>(`${API_ENDPOINT}/api/Report/history?${query}`, undefined, 'GET', undefined, headers);
}

export async function getEquipmentList(): Promise<Equipment[]> {
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : '')
  };
  return await FetchApi.fetchApiResponse<Equipment[]>(`${API_ENDPOINT}/api/Equipments`, [], 'GET', undefined, headers);
}

export async function postRequest(data?: RequestDto): Promise<Request | undefined> {
  const body = JSON.stringify(data ?? {
    requestId: 123,
    equipmentId: 123,
    equipment: {
      equipmentId: 123,
      name: 'string',
      type: 'string',
      serialNumber: 'string',
      condition: 'Excellent',
      status: 'Available',
      location: 'string',
      photoUrl: 'string'
    },
    requestedBy: 'string',
    requestedAt: 'string',
    approvedAt: 'string',
    returnedAt: 'string',
    status: 'Pending',
    notes: 'string'
  });
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : ''),
    'Content-Type': 'application/json; charset=utf-8'
  };
  return await FetchApi.fetchApiResponse<Request | undefined>(`${API_ENDPOINT}/api/Requests`, undefined, 'POST', body, headers);
}

export async function getRequestList(): Promise<Request[]> {
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : '')
  };
  return await FetchApi.fetchApiResponse<Request[]>(`${API_ENDPOINT}/api/Requests/my`, [], 'GET', undefined, headers);
}

export async function getRequestList1(): Promise<Request[]> {
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : '')
  };
  return await FetchApi.fetchApiResponse<Request[]>(`${API_ENDPOINT}/api/Requests`, [], 'GET', undefined, headers);
}

export async function getRequest(id: number): Promise<Request | undefined> {
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : '')
  };
  return await FetchApi.fetchApiResponse<Request | undefined>(`${API_ENDPOINT}/api/Requests/${id}`, undefined, 'GET', undefined, headers);
}

export async function postEquipment(data?: Equipment): Promise<Equipment | undefined> {
  const body = JSON.stringify(data ?? {
    equipmentId: 123,
    name: 'string',
    type: 'string',
    serialNumber: 'string',
    condition: 'Excellent',
    status: 'Available',
    location: 'string',
    photoUrl: 'string'
  });
  const headers: Record<string, string> = {
    Authorization: 'Bearer ' + (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)?.accessToken : ''),
    'Content-Type': 'application/json; charset=utf-8'
  };
  return await FetchApi.fetchApiResponse<Equipment | undefined>(`${API_ENDPOINT}/api/Equipments`, undefined, 'POST', body, headers);
}

export async function approveRequest(id: number): Promise<void> {
  const headers = {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')!)?.accessToken
  };
  await FetchApi.fetchApiResponse<void>(
    `https://localhost:7122/api/requests/${id}/approve`,
    undefined,
    'PUT',
    undefined,
    headers,
    false,
    true
  );
}

export async function returnRequest(id: number): Promise<void> {
  const headers = {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')!)?.accessToken
  };
  await FetchApi.fetchApiResponse<void>(
    `https://localhost:7122/api/requests/${id}/return`,
    undefined,
    'PUT',
    undefined,
    headers,
    false,
    true
  );
}

export async function rejectRequest(id: number): Promise<void> {
  const headers = {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')!)?.accessToken
  };
  await FetchApi.fetchApiResponse<void>(
    `https://localhost:7122/api/requests/${id}/reject`,
    undefined,
    'PUT',
    undefined,
    headers,
    false,
    true
  );
}