import { useCallback, useEffect, useState } from 'react';
import { Equipment } from '../models/TeamGPTInventory/equipment';
import { getEquipmentList, getHistoryReportDto, getRequest, getRequestList, getRequestList1, getUsageReportDto, postEquipment, postLoginResponse, postRegisterResponse, postRequest } from '../services/team-gptinventory';
import { LoginRequest } from '../models/TeamGPTInventory/login-request';
import { LoginResponse } from '../models/TeamGPTInventory/login-response';
import { RegisterRequest } from '../models/TeamGPTInventory/register-request';
import { RegisterResponse } from '../models/TeamGPTInventory/register-response';
import { Request } from '../models/TeamGPTInventory/request';
import { RequestDto } from '../models/TeamGPTInventory/request-dto';
import { UsageReportDto } from '../models/TeamGPTInventory/usage-report-dto';

export const usePostLoginResponse = (data?: LoginRequest) => {
  const [loginResponse, setLoginResponse] = useState<LoginResponse | undefined>();

  const requestLoginResponse = useCallback(() => {
    let ignore = false;
    postLoginResponse(data)
      .then((data) => {
        if (!ignore) {
          setLoginResponse(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [data]);

  useEffect(() => {
    requestLoginResponse();
  }, [data, requestLoginResponse]);

  return { requestTeamGPTInventoryLoginResponse: requestLoginResponse, teamGPTInventoryLoginResponse: loginResponse, setTeamGPTInventoryLoginResponse: setLoginResponse };
}

export const usePostRegisterResponse = (data?: RegisterRequest) => {
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse | undefined>();

  const requestRegisterResponse = useCallback(() => {
    let ignore = false;
    postRegisterResponse(data)
      .then((data) => {
        if (!ignore) {
          setRegisterResponse(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [data]);

  useEffect(() => {
    requestRegisterResponse();
  }, [data, requestRegisterResponse]);

  return { requestTeamGPTInventoryRegisterResponse: requestRegisterResponse, teamGPTInventoryRegisterResponse: registerResponse, setTeamGPTInventoryRegisterResponse: setRegisterResponse };
}

export const useGetUsageReportDto = (accesstoken: string, from?: Date, to?: Date, topItems?: number, topUsers?: number) => {
  const [usageReportDto, setUsageReportDto] = useState<UsageReportDto | undefined>();

  const requestUsageReportDto = useCallback(() => {
    let ignore = false;
    getUsageReportDto(accesstoken, from, to, topItems, topUsers)
      .then((data) => {
        if (!ignore) {
          setUsageReportDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [from, to, topItems, topUsers]);

  useEffect(() => {
    requestUsageReportDto();
  }, [from, to, topItems, topUsers, requestUsageReportDto]);

  return { requestTeamGPTInventoryUsageReportDto: requestUsageReportDto, teamGPTInventoryUsageReportDto: usageReportDto, setTeamGPTInventoryUsageReportDto: setUsageReportDto };
}

export const useGetHistoryReport = (from?: Date, to?: Date) => {
  const [report, setReport] = useState<Report[] | undefined>();

  const requestHistoryReport = useCallback(() => {
    let ignore = false;
    getHistoryReportDto(from, to)
      .then((data) => {
        if (!ignore) {
          setReport(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [from, to]);

  useEffect(() => {
    requestHistoryReport();
  }, [from, to, requestHistoryReport]);

  return { requestTeamGPTInventoryHistoryReport: requestHistoryReport, teamGPTInventoryHistoryReport: report, setTeamGPTInventoryHistoryReport: setReport };
}

export const useGetEquipmentList = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  const requestEquipment = useCallback(() => {
    let ignore = false;
    getEquipmentList()
      .then((data) => {
        if (!ignore) {
          setEquipment(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestEquipment();
  }, [requestEquipment]);

  return { requestTeamGPTInventoryEquipment: requestEquipment, teamGPTInventoryEquipment: equipment, setTeamGPTInventoryEquipment: setEquipment };
}

export const usePostRequest = (data?: RequestDto) => {
  const [request, setRequest] = useState<Request | undefined>();

  const requestRequest = useCallback(() => {
    let ignore = false;
    postRequest(data)
      .then((data) => {
        if (!ignore) {
          setRequest(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [data]);

  useEffect(() => {
    requestRequest();
  }, [data, requestRequest]);

  return { requestTeamGPTInventoryRequest: requestRequest, teamGPTInventoryRequest: request, setTeamGPTInventoryRequest: setRequest };
}

export const useGetRequestList = () => {
  const [request, setRequest] = useState<Request[]>([]);

  const requestRequest = useCallback(() => {
    let ignore = false;
    getRequestList()
      .then((data) => {
        if (!ignore) {
          setRequest(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestRequest();
  }, [requestRequest]);

  return { requestTeamGPTInventoryRequest: requestRequest, teamGPTInventoryRequest: request, setTeamGPTInventoryRequest: setRequest };
}

export const useGetRequestList1 = () => {
  const [request, setRequest] = useState<Request[]>([]);

  const requestRequest = useCallback(() => {
    let ignore = false;
    getRequestList1()
      .then((data) => {
        if (!ignore) {
          setRequest(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestRequest();
  }, [requestRequest]);

  return { requestTeamGPTInventoryRequest: requestRequest, teamGPTInventoryRequest: request, setTeamGPTInventoryRequest: setRequest };
}

export const useGetRequest = (id: number) => {
  const [request, setRequest] = useState<Request | undefined>();

  const requestRequest = useCallback(() => {
    let ignore = false;
    getRequest(id)
      .then((data) => {
        if (!ignore) {
          setRequest(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [id]);

  useEffect(() => {
    requestRequest();
  }, [id, requestRequest]);

  return { requestTeamGPTInventoryRequest: requestRequest, teamGPTInventoryRequest: request, setTeamGPTInventoryRequest: setRequest };
}

export const usePostEquipment = (data?: Equipment) => {
  const [equipment, setEquipment] = useState<Equipment | undefined>();

  const requestEquipment = useCallback(() => {
    let ignore = false;
    postEquipment(data)
      .then((data) => {
        if (!ignore) {
          setEquipment(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [data]);

  useEffect(() => {
    requestEquipment();
  }, [data, requestEquipment]);

  return { requestTeamGPTInventoryEquipment: requestEquipment, teamGPTInventoryEquipment: equipment, setTeamGPTInventoryEquipment: setEquipment };
}
