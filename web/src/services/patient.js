import { extend } from 'umi-request';

const request = extend({
  prefix: BASE_URL,
});

export async function queryPatients(params) {
  return request('/api/patients', { params });
}

export async function createPatient(params) {
  return request('/api/register', {
    method: 'post',
    data: params,
  });
}

export async function uploadFile(formData) {
  return request('/api/upload', {
    method: 'post',
    data: formData,
  });
}
