import { ConversionItem } from './conversion-table'

function isEmptyObject(test: any) {
  return Object.keys(test).length === 0 && test.constructor === Object
}

function nullEmptyObjects(source: any[][]): (ConversionItem | null)[][] {
  return source.map((x) => x.map((y) => (isEmptyObject(y) ? null : y)))
}

export function fetchGojuonOrderedKana(): Promise<(ConversionItem | null)[][]> {
  return fetch('data/gojuonOrderedKana.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}

export function fetchGojuonDakuten(): Promise<(ConversionItem | null)[][]> {
  return fetch('data/gojuonDakuten.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}

export function fetchGojuonHandakuten(): Promise<(ConversionItem | null)[][]> {
  return fetch('data/gojuonHandakuten.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}

export function fetchChiisaiKana(): Promise<(ConversionItem | null)[][]> {
  return fetch('data/chiisaiKana.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}
