export type DaDataParty = {
  value: string;
  data: {
    inn?: string;
    kpp?: string;
    ogrn?: string;
    name?: {
      full_with_opf?: string;
    };
    address?: {
      value?: string;
    };
    type?: 'LEGAL' | 'INDIVIDUAL';
    state?: {
      status?: string;
    };
  };
};


export type FindPartyRequest = {
  query: string;
  branch_type?: 'MAIN' | 'BRANCH';
};


export type FindPartyResponse = {
  suggestions: DaDataParty[];
};

const DADATA_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';


const DADATA_TOKEN = (import.meta.env.VITE_DADATA_TOKEN as string | undefined) ?? 'd995591573ac5a8c5ff9fce7bfed1319be2d2745';

export async function findPartyById(
  payload: FindPartyRequest
): Promise<FindPartyResponse> {

  const response = await fetch(DADATA_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${DADATA_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DaData error ${response.status}: ${text}`);
  }

  return (await response.json()) as FindPartyResponse;
}


